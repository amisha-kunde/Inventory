npm run build

git checkout gh-pages

rm -rf static
rm *
mv build/* .

git add .
git commit -m "publish to pages"
git push

git checkout main