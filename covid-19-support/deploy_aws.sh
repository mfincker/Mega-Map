set -x

aws s3 rm s3://www.bayareacommunity.org --recursive "$@"

cd dist

aws s3 cp index.html.gz "s3://www.bayareacommunity.org/index.html" --content-type "text/html" --content-encoding "gzip" --cache-control "no-cache" "$@"
aws s3 cp browserconfig.xml.gz "s3://www.bayareacommunity.org/browserconfig.xml" --content-type "application/xml" --content-encoding "gzip" "$@"
aws s3 cp favicon.ico.gz "s3://www.bayareacommunity.org/favicon.ico" --content-type "image/x-icon" --content-encoding "gzip" "$@"
aws s3 cp robots.txt "s3://www.bayareacommunity.org/robots.txt" --content-type "text/plain" "$@"

for i in */*.js.gz
do
    f="${i%%.gz}"
    aws s3 cp "$i" "s3://www.bayareacommunity.org/$f" --content-type "application/javascript" --content-encoding "gzip" --cache-control "public, max-age=31536000" "$@"
done

for i in */*.js.map.gz
do
    f="${i%%.gz}"
    aws s3 cp "$i" "s3://www.bayareacommunity.org/$f" --content-type "application/json" --content-encoding "gzip" --cache-control "public, max-age=31536000" "$@"
done

for i in */*.css.gz
do
    f="${i%%.gz}"
    aws s3 cp "$i" "s3://www.bayareacommunity.org/$f" --content-type "text/css" --content-encoding "gzip" --cache-control "public, max-age=31536000" "$@"
done

for i in */*.svg.gz
do
    f="${i%%.gz}"
    aws s3 cp "$i" "s3://www.bayareacommunity.org/$f" --content-type "image/svg+xml" --content-encoding "gzip" --cache-control "public, max-age=31536000" "$@"
done

for i in img/*.png
do
    aws s3 cp "$i" "s3://www.bayareacommunity.org/$i" --content-type "image/png" --cache-control "public, max-age=31536000" "$@"
done

for i in images/*.png
do
    aws s3 cp "$i" "s3://www.bayareacommunity.org/$i" --content-type "image/png" "$@"
done
