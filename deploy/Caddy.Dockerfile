# syntax=docker/dockerfile:1.7

FROM caddy:2-alpine

# The upstream binary carries cap_net_bind_service for ports below 1024. This
# gateway listens on 8080, so remove that file capability to remain compatible
# with no-new-privileges and a fully dropped container capability set.
USER root
RUN apk add --no-cache libcap \
  && setcap -r /usr/bin/caddy \
  && apk del libcap
USER 10001:10001
