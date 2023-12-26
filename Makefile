.PHONY: genkeys proto build
keys:
	openssl genrsa 4096 > secrets/keys/server.key
	openssl req -new -key secrets/keys/server.key -out secrets/keys/server.csr -subj "/CN=server.example.com"
	openssl x509 -req -days 365 -in secrets/keys/server.csr -signkey secrets/keys/server.key -out secrets/keys/server.crt
	rm secrets/keys/server.csr
enviroment:
	node ./utils/generate_environment.mjs
init:
	echo -1
proto:
	 cd src/proto/src && grpc_tools_node_protoc --js_out=import_style=commonjs,binary:.. --grpc_out=grpc_js:.. authentication.proto
clean-proto:
	cd src/proto && rm *.js
build:keys,enviroment,proto
