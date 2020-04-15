#! /bin/bash

docker run -it  --rm  --pid=host -v /$(pwd)://app:rw --workdir //app  18fgsa/html-proofer --allow-hash-href  --enforce-https  --check-favicon --check-opengraph --report-missing-names --report-invalid-tags $1
