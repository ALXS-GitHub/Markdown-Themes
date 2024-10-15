# TODO

## Important

- [ ] Use Env variable instead of cdn for faster version updates.
- [ ] Try to regroup common code (or css) in a single file if possible in order to avoid code duplication between multiple themes.
- [ ] Make the VSCode Extension its own repository.
- [ ] Make the pdf converter inside the VSCode extension its own repository (some changes will be needed in order to be able to use it in both terminal mode and vscode extension environment)

## Fixes (High Priority)



## Medium

- [ ] Make this repo as clean as possible by grouping common code, removing useless files, reorganizing the file structure... (make it prepared for easy deployment)
- [ ] Try to create a Template theme that will be the base for all the other themes.
- [ ] Make the footer bar hidden by default
- [ ] Maybe try to use a config file that that the theme will try to find at the file's location and use those specificities (or use a path to specify the config file) -> this will prevent to have a more complex script section at the top of the md file.
  
## Low

- [ ] Extension : add the h1 to h6 tags in the component list
- [ ] Extension : `<a>` tag in the component list (make sure that the selected text will be in the link). Also make it reversible (html a tag to md link).
- [ ] Extension : change `<img>` tag so it can transform the default md link when selected (with `![]()` to a proper html img tag). Also make it reversible (html img tag to md img tag). 
- [ ] Extension : we have the md to html for tables but the opposite would be nice too (html to md tables)
- [ ] Extension : Convert `/` fractions to latex (katex) fractions.
- [ ] Add a snippet for the cheatsheet theme (and for the future themes). Also make sure to add it in the extension menu.
- [ ] improve the readme file (first of all, show the common syntax and features to every theme, then you can link another md file for each theme with the specific syntax and features)
- [ ] Publish the extension on the marketplace when it will be ready.

## Minor Fixes

