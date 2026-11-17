# news-explorer-backend

Un backend diseñado para gestionar información de registro e inicio de sesión de usuarios mediante JWT, que adicionalmente permite guardar artículos de noticias.

Este proyecto consiste en un buscador de noticias que utiliza Javascript, Express, Winston para manejar la funcionalidad, incluye rutas que gestionan el perfil de los usuarios (/users/me) y sus artículos guardados (/articles), también hay rutas para el registro de usuarios (/signup) y el inicio de sesión (/sigin). Se utiliza MongoDB (mongoose) para gestionar y almacenar los datos de los usuarios y adicionalmente permite guardar artículos de noticias. Se implementan middlewares y dependencias para manejar la autenticación, la seguridad y los registros.

Se implementa una API funcional implementada en un servidor, el cual está vinculado a un dominio que trabaja con HTTPS.

Dirección donde se encuentra alojada la api: https://api.news.rinet.ai
