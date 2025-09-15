# autorent/settings.py
import os
from pathlib import Path
from decouple import config
from datetime import timedelta

# BASE DIR
BASE_DIR = Path(__file__).resolve().parent.parent

# =========================
# CONFIGURAÇÕES DE SEGURANÇA
# =========================
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# =========================
# APPS
# =========================
DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_filters',
]

LOCAL_APPS = [
    'apps.users',
    'apps.veiculos',
    'apps.alugueis',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS




# =========================
# MIDDLEWARE
# =========================
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# =========================
# URLS
# =========================
ROOT_URLCONF = 'autorent.urls'

# =========================
# TEMPLATES
# =========================
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Adicione caminhos de templates se precisar
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# =========================
# DATABASE
# =========================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'AvaliacaoWebII',
        'USER': 'postgres',
        'PASSWORD': 'p09017816490s',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# =========================
# AUTENTICAÇÃO
# =========================
AUTH_USER_MODEL = 'users.Usuario'  # User personalizado

# =========================
# REST FRAMEWORK
# =========================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# =========================
# JWT
# =========================
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
}

# =========================
# CORS
# =========================
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Frontend React
    "http://127.0.0.1:3000",
]

# =========================
# INTERNACIONALIZAÇÃO
# =========================
LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_TZ = True

# =========================
# ARQUIVOS ESTÁTICOS E MÍDIA
# =========================
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

# =========================
# DEFAULT AUTO FIELD
# =========================
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
