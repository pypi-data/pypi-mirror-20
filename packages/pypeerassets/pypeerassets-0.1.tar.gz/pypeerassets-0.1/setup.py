from setuptools import setup

setup(name='pypeerassets',
      version='0.1',
      description='Python implementation of the PeerAssets protocol.',
      keywords=["blockchain", "digital asset", "protocol"],
      url='https://github.com/peerassets/pypeerassets',
      author='PeerAssets',
      author_email='peerchemist@protonmail.ch',
      license='GPL',
      packages=['pypeerassets', 'pypeerassets.provider'],
      install_requires=['requests', 'secp256k1', 'protobuf3'],
      zip_safe=True)
