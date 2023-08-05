# vim:ts=2:sw=2:noet:
.SUFFIXES: .lo

CC=gcc
LN_S=ln -s
CPPFLAGS=
CFLAGS=-g -O2
LDFLAGS=
LD_LIBJLOG_VERSION=-current_version $(VERSION) -install_name $(libdir)/libjlog.$(MAJOR_VERSION).$(DOTSO)
AR=/usr/bin/ar
RANLIB=ranlib
LIBS=-lpthread 
INSTALL=/usr/bin/install -c
SHLD=gcc -dynamiclib -single_module -undefined dynamic_lookup
PERL=/usr/bin/perl
SHCFLAGS=-g -O2
DOTSO=dylib
JAVAC=/usr/bin/javac
JAR=/usr/bin/jar

MAJOR_VERSION=2
MINOR_VERSION=0
PATCH_VERSION=2
VERSION=$(MAJOR_VERSION).$(MINOR_VERSION).$(PATCH_VERSION)
LIBSHORT=libjlog.$(DOTSO)
LIBMAJOR=libjlog.$(MAJOR_VERSION).$(DOTSO)
LIBLONG=libjlog.$(VERSION).$(DOTSO)

prefix=/Users/yuq/.virtualenvs/emailsvc
exec_prefix=${prefix}
bindir=${exec_prefix}/bin
sbindir=${exec_prefix}/sbin
libdir=${exec_prefix}/lib
includedir=${prefix}/include
libexecdir=${exec_prefix}/libexec
datarootdir = ${prefix}/share
mandir=${datarootdir}/man
mansubdir=man
docdir=${prefix}/docs
sysconfdir=${prefix}/etc
srcdir=.
top_srcdir=.

AOBJS= \
	jlog.o jlog_hash.o jlog_io.o
SOOBJS= \
	jlog.lo jlog_hash.lo jlog_io.lo

all:	libjlog.$(DOTSO) libjlog.a jlogctl jlogtail test

.c.o:
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $<

.c.lo:
	$(CC) $(CPPFLAGS) $(CFLAGS) $(SHCFLAGS) -c $< -o $@

test:	jthreadtest jtest

perl/Makefile:	perl/Makefile.PL
	cd perl && $(PERL) Makefile.PL

jlogperl:	perl/Makefile
	@cd perl && make

jlogpython:
	cd python && make

jlogctl:	libjlog.a jlogctl.o getopt_long.o
	$(CC) $(CFLAGS) -o jlogctl jlogctl.o getopt_long.o libjlog.a $(LDFLAGS) $(LIBS)

jthreadtest:	libjlog.a jthreadtest.o getopt_long.o
	$(CC) $(CFLAGS) -o jthreadtest jthreadtest.o getopt_long.o libjlog.a $(LDFLAGS) $(LIBS)

jtest:	libjlog.a jtest.o
	$(CC) $(CFLAGS) -o jtest jtest.o libjlog.a $(LDFLAGS) $(LIBS)

jlogtail: libjlog.a jlogtail.o
	$(CC) $(CFLAGS) -o jlogtail jlogtail.o libjlog.a $(LDFLAGS) $(LIBS)

libjlog.$(DOTSO): $(SOOBJS)
	$(SHLD) $(LD_LIBJLOG_VERSION) -o libjlog.$(DOTSO) $(SOOBJS) $(LDFLAGS) $(LIBS)

libjlog.a:	$(AOBJS)
	$(AR) cr libjlog.a $(AOBJS)
	$(RANLIB) libjlog.a

java-bits: java/jlog.jar java/libjlog.jnilib java/jlogTest.class

java/jlog.jar:	java/jlog.java
	mkdir -p java_tmp && \
	$(JAVAC) -d java_tmp java/jlog.java && \
	$(JAR) -cf $@ -C java_tmp com && \
	rm -rf java_tmp

java/jlogTest.class:	java/jlogTest.java java/jlog.jar
	cd java && $(JAVAC) -cp jlog.jar jlogTest.java

java/com_omniti_labs_jlog.lo:	java/com_omniti_labs_jlog.c
	$(CC) -Wall -I. $(CPPFLAGS) $(CFLAGS) $(SHCFLAGS) -c $< -o $@

java/libjlog.jnilib:	java/com_omniti_labs_jlog.lo $(SOOBJS)
	$(SHLD) -o $@ java/com_omniti_labs_jlog.lo $(SOOBJS) $(LDFLAGS) $(LIBS)

install:
	$(srcdir)/mkinstalldirs $(DESTDIR)$(bindir)
	$(srcdir)/mkinstalldirs $(DESTDIR)$(libdir)
	$(srcdir)/mkinstalldirs $(DESTDIR)$(includedir)
	$(INSTALL) -m 0755 jlogctl $(DESTDIR)$(bindir)/jlogctl
	$(INSTALL) -m 0755 jlogtail $(DESTDIR)$(bindir)/jlogtail
	$(INSTALL) -m 0755 jlog_change_endian.pl $(DESTDIR)$(bindir)/jlog_change_endian
	$(INSTALL) -m 0755 jlog_sanity_check.pl $(DESTDIR)$(bindir)/jlog_sanity_check
	$(INSTALL) -m 0755 libjlog.a $(DESTDIR)$(libdir)/libjlog.a
	$(INSTALL) -m 0755 libjlog.$(DOTSO) $(DESTDIR)$(libdir)/$(LIBLONG)
	$(LN_S) -f $(LIBLONG) $(DESTDIR)$(libdir)/$(LIBSHORT)
	$(LN_S) -f $(LIBLONG) $(DESTDIR)$(libdir)/$(LIBMAJOR)
	$(INSTALL) -m 0644 jlog.h $(DESTDIR)$(includedir)/jlog.h
	$(INSTALL) -m 0644 jlog_private.h $(DESTDIR)$(includedir)/jlog_private.h
	$(INSTALL) -m 0644 jlog_io.h $(DESTDIR)$(includedir)/jlog_io.h
	$(INSTALL) -m 0644 jlog_config.h $(DESTDIR)$(includedir)/jlog_config.h

install-perl:
	cd perl ; make install DESTDIR=$(DESTDIR) INSTALLDIRS=vendor

install-python:
	cd python && make install

clean:
	rm -f *.o *.lo *.$(DOTSO) *.a jthreadtest jtest jlogctl jlogtail
	rm -f java/*.jar java/*.jnilib java/*.lo
	-if test -f perl/Makefile ; then cd perl ; make clean ; fi
	cd python && make clean

distclean: 	clean
	rm -f Makefile jlog_config.h perl/Makefile.PL

.SUFFIXES: .c .o .lo
