all: 
	@$(MAKE) build
	@$(MAKE) cp

build:
	@echo "Building backend..."
	cargo build --release --manifest-path Cargo.toml

clean:
	@echo "Cleaning backend..."
	@cargo clean --manifest-path Cargo.toml

cp:
	@echo "Copying backend to bin..."
	@mkdir -p ../bin
	@cp -f target/release/wine-cask ../bin/backend
