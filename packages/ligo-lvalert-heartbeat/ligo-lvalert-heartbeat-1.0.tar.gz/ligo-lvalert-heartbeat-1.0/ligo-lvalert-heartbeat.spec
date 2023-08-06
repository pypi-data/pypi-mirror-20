%define name              ligo-lvalert-heartbeat
%define version           1.0
%define unmangled_version 1.0
%define release           1

Summary:   LVAlert Heartbeat Tools
Name:      %{name}
Version:   %{version}
Release:   %{release}%{?dist}
Source0:   %{name}-%{unmangled_version}.tar.gz
License:   GPL
Group:     Development/Libraries
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-buildroot
Prefix:    %{_prefix}
BuildArch: noarch
Vendor:    Alexander Pace <alexander.pace@ligo.org>, Tanner Prestegard <tanner.prestegard@ligo.org>
Requires:  python ligo-common pyxmpp ligo-lvalert
BuildRequires: python-setuptools
Url:       https://wiki.ligo.org/DASWG/LVAlert

%description
This module implements a basic functionality monitor for lvalert_listen 
instances via the LVAlert system itself. 

%prep
%setup -n %{name}-%{unmangled_version}

%build
python setup.py build

%install
python setup.py install --root=$RPM_BUILD_ROOT --record=INSTALLED_FILES

%clean
rm -rf $RPM_BUILD_ROOT

%files -f INSTALLED_FILES
%defattr(-,root,root)
%exclude %{python_sitelib}/ligo/lvalert-heartbeat/*pyo
