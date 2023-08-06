OUT_DIR=build
BOOK_DIR=$(OUT_DIR)/book
MAN_DIR=$(OUT_DIR)/man/man1

BOOK_SRC = index.adoc
MAN_SRC = feedcommas.1.adoc

GEN = ../tools/gen-in
VERSION = $(shell ../tools/gen-version)

ASCIIDOC = asciidoctor -a "revnumber=$(VERSION)"

.PHONY: all
all: book man

.PHONY: book
book: $(BOOK_SRC)
	mkdir -p $(BOOK_DIR)
	$(ASCIIDOC) $^ -o $(BOOK_DIR)/feedcommas.html

.PHONY: man
man: $(MAN_SRC)
	mkdir -p $(MAN_DIR)
	$(ASCIIDOC) -d manpage -b manpage -o $(MAN_DIR)/feedcommas.1 $<
	$(ASCIIDOC) -d manpage -o $(MAN_DIR)/feedcommas.1.html $<

.PHONY: clean
clean:
	rm -rf $(OUT_DIR)

%.adoc: %.adoc.in
	$(GEN) $< > $@
