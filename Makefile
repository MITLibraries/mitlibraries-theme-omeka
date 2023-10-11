.PHONY: help
SHELL=/bin/bash

help: ## Print this message
	@awk 'BEGIN { FS = ":.*##"; print "Usage:  make <target>\n\nTargets:" } \
		/^[-_[:alpha:]]+:.?*##/ { printf "  %-15s%s\n", $$1, $$2 }' $(MAKEFILE_LIST)

clean: ## Delete downloaded zip and extracted files
	rm -f tmp/assets.zip
	rm -rf tmp/mitlib-style-master

fetch: clean ## Grab latest from theme repo (auto runs clean first)
	mkdir -p tmp
	curl -o tmp/assets.zip https://codeload.github.com/MITLibraries/mitlib-style/zip/master
	unzip -o -d tmp tmp/assets.zip

update: fetch ## Synchronize latest (auto runs clean and fetch first)
	# Cleanup targets first, in case assets were removed
	rm -f asset/css/libraries-main.min.css
	rm -rf asset/img/mitlib-style/
	mkdir asset/img/mitlib-style/
	# Copy the compiled stylesheet
	cp tmp/mitlib-style-master/dest/css/libraries-main.min.css asset/css/libraries-main.min.css
	# Copy favicon and images
	cp tmp/mitlib-style-master/_assets/i/favicon.ico         asset/img/mitlib-style/favicon.ico
	cp tmp/mitlib-style-master/_assets/i/mitlib-wordmark.svg asset/img/mitlib-style/mitlib-wordmark.svg
	cp tmp/mitlib-style-master/_assets/i/vi-shape7-tp.svg    asset/img/mitlib-style/vi-shape7-tp.svg
