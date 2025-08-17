FROM oven/bun:latest AS builder
WORKDIR /app

COPY package.json ./
RUN bun install

COPY . .

RUN mkdir -p ./public ./public/js ./public/css ./public/pgp ./src ./src/css ./src/img ./src/js ./src/pgp

RUN bun run build:linux:bun

RUN rm -f ./src/css/main.css || true

FROM oven/bun:latest AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
RUN bun install --omit=dev

COPY --from=builder /app/app.js ./app.js
COPY --from=builder /app/views ./views
COPY --from=builder /app/public ./public
COPY --from=builder /app/src/pgp ./src/pgp

RUN set -eux; \
	if command -v useradd >/dev/null 2>&1; then \
		groupadd -g 1001 app; \
		useradd -u 1001 -g app -r -d /app -s /usr/sbin/nologin app; \
	else \
		addgroup -g 1001 app; \
		adduser -D -G app -u 1001 app; \
	fi; \
	chown -R 1001:1001 /app
USER 1001

EXPOSE 5566

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD bun eval "fetch('http://localhost:' + (process.env.PORT||5566)).then(r=>{if(r.status!==200)process.exit(1)}).catch(()=>process.exit(1))" || exit 1

CMD ["bun", "app.js"]
