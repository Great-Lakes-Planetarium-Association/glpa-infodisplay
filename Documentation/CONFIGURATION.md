# `glpa-infodisplay.json` configuration
The `glpa-infodisplay.json` file contains a number of components for NodeCG as well as for libraries in use within the bundle.  This file is a json formatted document.

*Note: Comments are not supported in the final file.  You should not use the block below to build the configuration file; rather use the sample file.*

```
{
    "conference": {
        # This information is used in generating the header graphics.
        "tite":    "",
        "city":    "",
        "state":   "",
        "startdate":   "",
        "enddate": ""
    },
    "twitter": {
        # For Twitter
        <thanks to the new Twitter API this has to be redone>
    },
    "weather": {
        # Weather data comes from DarkSky.net.  The free API is enough for our purpose.  Get the API key from https://darksky.net/dev/account
        "APIKey": "",
        # Coordinates can be found by searching on DarkSky for the location and then copying out of the URL.
        "latitude": "",
        "longitude": "",
        # How often to refresh weather data in minutes.  Minimum is 5 minutes.
        "interval": "5"
    }
}
```