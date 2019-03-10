#!/bin/bash

CVMHelper(){
        node index.js
    }

    until CVMHelper; do
            echo "'CVMHelper' crashed with exit code $?. Restarting..." >&2
        sleep 2
    done