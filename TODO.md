# TODO

## Important

- [ ] Try to regroup common code (or css) in a single file if possible in order to avoid code duplication between multiple themes.
- [ ] Make this repo as clean as possible by grouping common code, removing useless files, reorganizing the file structure... (make it prepared for easy deployment)

## Fixes (High Priority)


## Medium

- [ ] Make the footer bar hidden by default
- [ ] Maybe try to use a config file that that the theme will try to find at the file's location and use those specificities (or use a path to specify the config file) -> this will prevent to have a more complex script section at the top of the md file.
- [ ] Try to create a Template theme that will be the base for all the other themes.
- [ ] Try to make the custom components (like the plan) to stay active when some modifications are made.
  
## Low

- [ ] improve the readme file (first of all, show the common syntax and features to every theme, then you can link another md file for each theme with the specific syntax and features)

## Minor Fixes

- [ ] Link in TOC (plan) are not clickable in the pdf version.

## Done

- [X] Make the VSCode Extension its own repository.
- [X] Use Env variable instead of cdn for faster version updates. For this, make sure that the extension calculate the path to the theme file correctly by using multiple `../` before adding the full path.
- [X] Made a local server inside the Extension to load the theme folder using the ALXS_MD_THEME_PATH env variable.
- [X] Make the pdf converter inside the VSCode extension its own repository (some changes will be needed in order to be able to use it in both terminal mode and vscode extension environment)
- [X] Fix tables that are not rendered properly while converting to pdf when they are in md format. Extension seems to treat it as normal text block.
- [X] Extension : Maybe try to make a setup parameter for the ALXS_MD_THEME_PATH env variable (or make it a global variable that can be changed in the settings).
- [X] Extension : Add back the snippets and change the theme buttons to load the local server url instead of the path of the ALXS_MD_THEME_PATH env variable.
- [X] Made a button to restart the server

## Unnecessary / Not (Hardly) possible 

