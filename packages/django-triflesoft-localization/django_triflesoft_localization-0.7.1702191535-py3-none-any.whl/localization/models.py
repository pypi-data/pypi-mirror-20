from django.conf import settings
from django.db.models import AutoField
from django.db.models import CharField
from django.db.models import Model


class LocalizableValueBase(Model):
    id                  = AutoField(                               blank=False, unique=True,  primary_key=True)
    #localizable_object  = ForeignKey(LocalizableObject,            blank=False, unique=False, related_name='+')
    language_code       = CharField(                               blank=False, unique=False, max_length=8, choices=settings.LANGUAGES)
    value               = CharField(                               blank=False, unique=False, max_length=256)

    def __str__(self):
        return self.value

    class Meta:
        abstract = True
        unique_together     = [('localizable_object', 'language_code',)]


class LocalizableObjectBase(Model):
    def __init__(self, *args, **kwargs):
        super(LocalizableObjectBase, self).__init__(*args, **kwargs)

        from django.utils import translation

        self._language_code = translation.get_language()
        self._localizable_cache = {}
        self._localizable_value = {}

        self._localizable_text = {}
        self._localizable_item = {}
        self._localizable_loaded = {}

    def _load_localizable(self, related_manager, name):
        if not self._localizable_loaded.get(name, False):
            result_text = self._localizable_text.get(name)

            if not result_text:
                result_item = None

                for item in related_manager.all():
                    if item.language_code == self._language_code:
                        result_item = item
                        result_text = item.value
                    elif (item.language_code == 'en') and (result_item is None):
                        result_text = item.value
                    elif result_text is None:
                        result_text = item.value

                self._localizable_text[name] = result_text

                if result_item:
                    self._localizable_item[name] = result_item

            self._localizable_loaded[name] = True

    def _get_localizable_value(self, related_manager, name, default):
        self._load_localizable(related_manager, name)

        result_text = self._localizable_text.get(name)

        if not result_text:
            result_text = default

        return result_text

    def _set_localizable_value(self, related_manager, name, value):
        self._load_localizable(related_manager, name)

        result_item = self._localizable_item.get(name)

        if result_item:
            if len(value) > 0:
                result_item.value = value
                result_item.save()
                self._localizable_text[name] = value
            else:
                result_item.delete()
                del self._localizable_item[name]
        else:
            if len(value) > 0:
                result_item = related_manager.create(language_code=self._language_code, value=value)
                self._localizable_item[name] = result_item
                self._localizable_text[name] = value

    def _del_localizable_value(self, related_manager, name):
        self._load_localizable(related_manager, name)

        result_item = self._localizable_item.get(name)

        if result_item:
            result_item.delete()
            del self._localizable_item[name]

    class Meta:
        abstract = True
