from distutils.core import setup
setup(
    name = 'sharp_aquos_rc',
    packages = ['sharp_aquos_rc'],
    package_data={'sharp_aquos_rc': ['commands/*.yaml']},
    version = '0.4',
    description = 'Control Sharp Aquos SmartTVs through the IP interface.',
    author = 'Jeffrey Moore',
    author_email = 'jmoore987@yahoo.com',
    url = 'https://github.com/jmoore987/sharp_aquos_rc',
    download_url = 'https://github.com/jmoore987/sharp_aquos_rc/tarball/0.4',
    keywords = ['sharp', 'aquos', 'remote', 'control', 'tv', 'smarttv', 'iot' ],
    classifiers = []
)
