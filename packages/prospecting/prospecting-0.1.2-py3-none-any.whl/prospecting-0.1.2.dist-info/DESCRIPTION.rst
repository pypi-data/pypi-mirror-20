![status](https://img.shields.io/badge/status-wip-lightgrey.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg)

<!-- 
![docker pulls](https://img.shields.io/docker/pulls/jupyter/base-notebook.svg) ![docker stars](https://img.shields.io/docker/stars/jupyter/base-notebook.svg) [![](https://images.microbadger.com/badges/image/jupyter/base-notebook.svg)](https://microbadger.com/images/jupyter/base-notebook "jupyter/base-notebook image metadata")
-->

# &#x2692; Prospecting &#x2692; <!-- &#9874; -->

This project started as an effort to predict a 'prospect score' for each business in a list of current and (predominantly) potential customers. 

While the initial goal was to provide a list to help prioritize sales opportunities (ex. rank order prospects by state), I also had some ideas about tying in Google Sheets to help with my typical ML workflow (data profiling > clean/transform > performance reporting > delivery of final predictions > revisiting column treatments >> etc). OAuth 2.0 is used for Google API authentication when using the `SheetsApi` and `DriveApi` classes, and the usual Sheets sharing options exist if you want to invite collaborators.

I'll be updating this README and documentation in general...In the interim - as an example of how Google Sheets is used, the following table outlines the spreadsheets and tabs which I have found to be useful. While I cannot share my original prospecting dataset, I used an old [Innocentive challenge dataset](https://github.com/reidbradley/prospecting/blob/master/data/README.md) as an example.

| spreadsheet | sheet | note
| --- | --- | ---
| [**projectname_metadata**](https://docs.google.com/spreadsheets/d/17R9V5tefzFzMXBi2i9SOybhqwzF7PSlse9OO99BfDxQ/) | _metadata_ | Control logic for column processing treatments; used by Python to inform how each column is processed. The functions in `process.py` rely on information from this tab.
|  | _raw_descr_ | Descriptive information about raw data (`df_raw`)
|  | _clean_descr_ | Descriptive information about cleaned dataset (`df_clean`)
| --- | --- | ---
| [**projectname_model_reporting**](https://docs.google.com/spreadsheets/d/1dG5lQfqthqshz45Rs94VLSSWmSrS60b1iw7cT4Rqevs/) | _session_report_ | Summarizes model performance, plan to make this the main performance tab. A "session" represents an instance of a "ModelSession" class instance which is used to share access to train/test sets.
|  | _cv_results_ | If GridSearchCV is used, the `GridSearchCV.cv_results_` reports are saved here (shows performance by fold for each parameter set evaluated)
|  | _model_types_ | A simple lookup table, used by Python script as a reference when building the report for the `session_report` tab
|  | _\_plots_ | <a href="https://docs.google.com/spreadsheets/d/1dG5lQfqthqshz45Rs94VLSSWmSrS60b1iw7cT4Rqevs/pubchart?oid=1358454056&format=interactive"><img src="https://docs.google.com/spreadsheets/d/1dG5lQfqthqshz45Rs94VLSSWmSrS60b1iw7cT4Rqevs/pubchart?oid=1358454056&format=image" alt="performance report" height="115px"></a>&nbsp;<a href="https://docs.google.com/spreadsheets/d/1dG5lQfqthqshz45Rs94VLSSWmSrS60b1iw7cT4Rqevs/pubchart?oid=6448021&format=interactive"><img src="https://docs.google.com/spreadsheets/d/1dG5lQfqthqshz45Rs94VLSSWmSrS60b1iw7cT4Rqevs/pubchart?oid=6448021&format=image" alt="performance report subset" height="115px"></a>
| --- | --- | ---
| **projectname_predictions** | _predictions_ | Final predictions, with probabilities
|  | _lookupmaster_ | A lookup table with master list of prospects / entities of interest, or misc information to join with predictions
|  | _README_ | Intend to use as an FYI tab, to provide overview of health of predictions made (ex. highlight number of correct/incorrect predictions, etc)



<!--
- **prospecting_metadata**
 - _metadata_ - Control logic for column processing treatments; used by Python to inform how each column is processed
 - _raw_descr_ - Descriptive information about raw data (`df_raw`)
 - _clean_descr_ - Descriptive information about cleaned dataset (`df_clean`)

- **prospecting_model_reporting** (data model WIP)
 - _session_report_ - Summarizes model performance, plan to make this the main performance tab. A "session" represents an instance of a "ModelSession" class I created to allow sharing of train/test sets.
 - _cv_results_ - If GridSearchCV is used, the `GridSearchCV.cv_results_` reporting is saved here (shows k-fold performance for each parameter set evaluated)
 - _model_types_ - A simple lookup table, used as a reference when building the report for the `session_report` tab

- **prospecting_predictions**
 - _predictions_ - Final predictions, with probabilities, by firm
 - _prospects_ - Master list of prospects
 - _README_ - Intend to use as an FYI tab, and to provide overview of health of predictions made (ex. highlight number of correct/incorrect predictions, etc)
-->

## Overview

* The project directory contains:
```
        .
        â”œâ”€â”€ .dockerignore
        â”œâ”€â”€ .gitattributes              # For CRLF correction
        â”œâ”€â”€ .gitignore
        â”œâ”€â”€ credentials/                # Not necessarily best practice, but convenient
        â”‚Â Â  â”œâ”€â”€ README.md
        â”‚Â Â  â””â”€â”€ certs/
        â”‚       â””â”€â”€ README.md
        â”œâ”€â”€ data/
        â”‚Â Â  â”œâ”€â”€ README.md
        â”‚Â Â  â””â”€â”€ tmp/                    # Logs saved here
        â”‚       â”œâ”€â”€ README.md
        â”‚       â””â”€â”€ joblib/             # Used by scikit learn when running in Docker container
        â”‚           â””â”€â”€ README.md
        â”œâ”€â”€ Dockerfile                  # See README_detail.md for more info
        â”œâ”€â”€ LICENSE.md
        â”œâ”€â”€ jupyter_notebook_config.py  # See README_detail.md for more info
        â”œâ”€â”€ mplimporthook.py            # Used by Dockerfile
        â”œâ”€â”€ notebooks/                  # Jupyter Notebooks
        â”œâ”€â”€ prospecting
        â”‚Â Â  â”œâ”€â”€ __init__.py
        â”‚Â Â  â”œâ”€â”€ env.py                  # Check here for environment variables required
        â”‚Â Â  â”œâ”€â”€ utils.py
        â”‚Â Â  â”œâ”€â”€ api.py                  # Google Sheets and Google Drive API classes
        â”‚Â Â  â”œâ”€â”€ process.py              # Data cleaning functions, relies on info in metadata tab
        â”‚Â Â  â”œâ”€â”€ model.py
        â”‚Â Â  â”œâ”€â”€ report.py
        â”‚Â Â  â”œâ”€â”€ errors.py
        â”‚Â Â  â””â”€â”€ version.py
        â”œâ”€â”€ README.md
        â”œâ”€â”€ requirements_nonconda.txt   # Used by Dockerfile
        â”œâ”€â”€ scripts
        â”‚Â Â  â””â”€â”€ hash_jupyter_pw.py      # Create hashed password to use with Docker container
        â”œâ”€â”€ start-notebook.sh           # Used by Dockerfile
        â”œâ”€â”€ start.sh                    # Used by Dockerfile
        â””â”€â”€ start-singleuser.sh         # Used by Dockerfile
```
&#x2692; &#x2692; &#x2692;


