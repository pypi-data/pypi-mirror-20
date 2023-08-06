FROM debian:jessie-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        autofs \
        cron \
        python-pip \
        python-pkg-resources \
        supervisor \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p \
        /files/incomplete /files/downloads /files/torrents \
        /var/www \
        /var/log/putio-automator/ \
    && chown -R www-data /files /var/www \
    && usermod -u 1000 www-data

COPY etc/supervisor.conf /etc/supervisor/conf.d/putio-automator.conf
COPY etc/config.py.dist /usr/local/share/putio-automator/config.py
COPY etc/cron /etc/cron.d/putio-automator

RUN echo "\n\n[inet_http_server]\nport=9001" >> /etc/supervisor/supervisord.conf

RUN pip install putio-automator==0.4.2.dev34 \
    && rm -rf $HOME/.cache

ENV INITSYSTEM on

EXPOSE 9001

ENTRYPOINT [ "putio" ]

CMD [ "docker", "bootstrap" ]
