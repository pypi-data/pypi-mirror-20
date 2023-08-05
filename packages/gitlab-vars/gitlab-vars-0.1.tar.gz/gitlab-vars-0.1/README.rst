Just like heroku config, but for a project on gitlab.
Set, unset and list project secret variables.

Usage:
    Define API_URL of your gitlab.
    Get project ID you are working on.
    Set it inside your .gitlabvars.ini (global or local in the root of a project) under the variable PROJECT_ID
    Set CERT_PATH variable pointing to the gitlab certificate.

    ```GITLAB_PRIVATE_TOKEN=xxx python3 gitlabvars.py projects```
    Use your private token from gitlab account settings to enable auth.

