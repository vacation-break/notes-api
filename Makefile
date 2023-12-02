.PHONY: genkeys
keys:
	openssl genrsa 4096 > secrets/keys/server.key
	openssl req -new -key secrets/keys/server.key -out secrets/keys/server.csr -subj "/CN=server.example.com"
	openssl x509 -req -days 365 -in secrets/keys/server.csr -signkey secrets/keys/server.key -out secrets/keys/server.crt
	rm secrets/keys/server.csr
enviroment:
	node ./utils/generate_environment.mjs
init:
	echo -1
protoc:
	protoc --js_out=import_style=module --grpc_out=grpc_jsgroute_guide.proto

