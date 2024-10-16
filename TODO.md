# TODO

## Important

- [ ] Try to regroup common code (or css) in a single file if possible in order to avoid code duplication between multiple themes.

## Fixes (High Priority)

- [ ] Extension : Add back the snippets and change the theme buttons to load the local server url instead of the path of the ALXS_MD_THEME_PATH env variable.

## Medium

- [ ] Make this repo as clean as possible by grouping common code, removing useless files, reorganizing the file structure... (make it prepared for easy deployment)
- [ ] Try to create a Template theme that will be the base for all the other themes.
- [ ] Make the footer bar hidden by default
- [ ] Maybe try to use a config file that that the theme will try to find at the file's location and use those specificities (or use a path to specify the config file) -> this will prevent to have a more complex script section at the top of the md file.
- [ ] Extension : Maybe try to make a setup parameter for the ALXS_MD_THEME_PATH env variable (or make it a global variable that can be changed in the settings).
  
## Low

- [ ] Extension : add the h1 to h6 tags in the component list
- [ ] Extension : `<a>` tag in the component list (make sure that the selected text will be in the link). Also make it reversible (html a tag to md link).
- [ ] Extension : change `<img>` tag so it can transform the default md link when selected (with `![]()` to a proper html img tag). Also make it reversible (html img tag to md img tag). 
- [ ] Extension : we have the md to html for tables but the opposite would be nice too (html to md tables)
- [ ] Extension : Convert `/` fractions to latex (katex) fractions.
- [ ] improve the readme file (first of all, show the common syntax and features to every theme, then you can link another md file for each theme with the specific syntax and features)
- [ ] Publish the extension on the marketplace when it will be ready.

## Minor Fixes

- [ ] Link in TOC (plan) are not clickable in the pdf version.

## Done

- [X] Make the VSCode Extension its own repository.
- [X] Use Env variable instead of cdn for faster version updates. For this, make sure that the extension calculate the path to the theme file correctly by using multiple `../` before adding the full path.
- [X] Made a local server inside the Extension to load the theme folder using the ALXS_MD_THEME_PATH env variable.
- [X] Make the pdf converter inside the VSCode extension its own repository (some changes will be needed in order to be able to use it in both terminal mode and vscode extension environment)
- [X] Fix tables that are not rendered properly while converting to pdf when they are in md format. Extension seems to treat it as normal text block.

## Unnecessary / Not (Hardly) possible 

- [ ] <s>Make something to auto update the snippets path</s> -> not possible because we now use a local path that can vary
- [ ] <s>Add a snippet for the cheatsheet theme (and for the future themes).</s> -> not possible because we now use a local path that can vary
