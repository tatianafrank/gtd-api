	<h1>
	GTD API
	</h1>
	<h3>
		This is an unofficial API for searching the GTD and receiving JSON results. 
	</h3>
	<h4>For more information on GTD please visit https://www.start.umd.edu/gtd/</h4>
	<p>	
		To search, visit or send a get request to <strong>/search/</strong> followed by your query parameters (info below).<br>
	</p>
	<h3>Query Paramaters</h3>
	<p>
		Please use the GTD codebook as a reference alongside this API. The paramaters below correspond directly to the data fields described in the codebook.
		You can access the codebook at <a href="https://www.start.umd.edu/gtd/downloads/Codebook.pdf">https://www.start.umd.edu/gtd/downloads/Codebook.pdf</a><br><br> 
		
		(Startyr/ Endyr)<br> - The range of years during which incidents occurred. If you are searching for incidents that occured during one specific year, enter that year as the value for Startyr and enter the following year as the value for Endyr. For example, if you would like to search incidents that occurred in 1992, enter 1992 as the Startyr value and 1993 as the Endyr value. If using Startyr you must also include Endyr.
		<ul>

			<li>
				<strong>Startyr</strong><br> - The first (or exact) year during which incident(s) took place. Accepts numerical value only.
			</li>
			<br>
			<li>
			<strong>Endyr</strong><br> - Endyr is require if using Startyr. If you are searching for incidents during a range of years, Endyr would be the end of the range but not included in the range. For example, to search incidents which took place during 1991-1993 including 1993 enter 1994 as the Endyr and 1991 as the Startyr. Accepts numerical value only.
			</li>
			<br>
			<li>
				<strong>Country</strong><br> - Numerical code for country or countries you would like to search. To search for a range of countries, enter a new country parameter for each additional country. For example, to search for incident that occurred in Afghanistan and Albania enter 'search/&amp;country=4&amp;country=5'. Please reference the GTD codebook for the list of country codes. Accepts numerical value only.
			</li>
			<br>
			<li>
				<strong>attacktype1</strong><br> - Numerical code for method of attack. To search for a range, enter a new attacktype1 parameter for each additional type. Please refer to the <a href="https://www.start.umd.edu/gtd/downloads/Codebook.pdf">GTD Codebook</a> for list of attack type codes. Accepts numerical value only.
			</li>
			<br>
			<li>
				<strong>targtype1 </strong><br> - Numerical code for target/victim type. To search for a range, enter a new targtype1 parameter for each additional type. Please refer to the <a href="https://www.start.umd.edu/gtd/downloads/Codebook.pdf">GTD Codebook</a> for list of target type codes. Accepts numerical value only.
			</li>
			<br>
			<li>
				<strong>weaptype1</strong><br> - Numerical code for weapon type. To search for a range, enter a new weaptype1 parameter for each additional type. Please refer to the <a href="https://www.start.umd.edu/gtd/downloads/Codebook.pdf">GTD Codebook</a> for list of weapon type codes. Accepts numerical value only.
			</li>

		</ul>
	</p>