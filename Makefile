# Copyright (c) 2024 Hemashushu <hippospark@gmail.com>, All rights reserved.
#
# This Source Code Form is subject to the terms of
# the Mozilla Public License version 2.0 and additional exceptions,
# more details in file LICENSE, LICENSE.additional and CONTRIBUTING.

# compile by wabt
# https://github.com/WebAssembly/wabt
.PHONY: build
build:
	wat2wasm ans_compiler.wat -o ans_compiler.wasm

# compile by wasm-tools
# https://github.com/bytecodealliance/wasm-tools
.PHONY: build_alt
build_alt:
	wasm-tools parse ans_compiler.wat -o ans_compiler.wasm

# create local http server
# https://github.com/http-party/http-server
.PHONY: server
server:
	http-server .

# create local http server
# https://docs.python.org/3/library/http.server.html
.PHONY: server_alt
server_alt:
	python -m http.server 8080