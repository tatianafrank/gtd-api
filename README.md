**API for querying GTD**

This is an unofficial API for searching the GTD and receiving JSON results. 

For more information on GTD please visit https://www.start.umd.edu/gtd/

To search, visit or send a get request to **/search/** followed by your query parameters
example: http://104.131.99.148:8080/search/country=14

**Query Paramaters**

(Startyr/ Endyr)
 - The range of years during which incidents occurred. If you are searching for incidents that occured during one specific year, enter that year as the value for Startyr and enter the following year as the value for Endyr. For example, if you would like to search incidents that occurred in 1992, enter 1992 as the Startyr value and 1993 as the Endyr value. If using Startyr you must also include Endyr.

				**Startyr**
				<br> - The first (or exact) year during which incident(s) took place. Accepts numerical value only.

			**Endyr**
			- Endyr is require if using Startyr. If you are searching for incidents during a range of years, Endyr would be the end of the range but not included in the range. For example, to search incidents which took place during 1991-1993 including 1993 enter 1994 as the Endyr and 1991 as the Startyr. Accepts numerical value only.

				**Country**
				- Numerical code for country or countries you would like to search. To search for a range of countries, enter a new country parameter for each additional country. For example, to search for incident that occurred in Afghanistan and Albania enter 'search/&amp;country=4&amp;country=5'. Please reference the GTD codebook for the list of country codes. Accepts numerical value only.

				**attacktype1**
				- Numerical code for method of attack. To search for a range, enter a new attacktype1 parameter for each additional type. Please refer to the <a href="https://www.start.umd.edu/gtd/downloads/Codebook.pdf">GTD Codebook</a> for list of attack type codes. Accepts numerical value only.

				**argtype1**
				- Numerical code for target/victim type. To search for a range, enter a new targtype1 parameter for each additional type. Please refer to the <a href="https://www.start.umd.edu/gtd/downloads/Codebook.pdf">GTD Codebook</a> for list of target type codes. Accepts numerical value only.

				**weaptype1**
				 - Numerical code for weapon type. To search for a range, enter a new weaptype1 parameter for each additional type. Please refer to the <a href="https://www.start.umd.edu/gtd/downloads/Codebook.pdf">GTD Codebook</a> for list of weapon type codes. Accepts numerical value only.
