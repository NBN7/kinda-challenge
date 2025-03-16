const express = require('express');
const path = require('path');
const fs = require('fs');
const csvParser = require('csv-parser');
const app = express();
const port = 5000;

const filePath = path.join(__dirname, 'data', 'Film_Locations_in_San_Francisco_20250313.csv');

// caching de los datos del CSV
let cachedMovies = null;

const loadMoviesData = () => {
  return new Promise((resolve, reject) => {
    if (cachedMovies) {
      return resolve(cachedMovies); 
    }
    
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        results.push({
          title: data.Title,
          releaseYear: data["Release Year"],
          locations: data.Locations,
          funFacts: data["Fun Facts"],
          productionCompany: data["Production Company"],
          distributor: data.Distributor,
          director: data.Director,
          writer: data.Writer,
          actor1: data["Actor 1"],
          actor2: data["Actor 2"],
          actor3: data["Actor 3"],
          point: data.Point,
          longitude: data.Longitude,
          latitude: data.Latitude,
          analysisNeighborhood: data["Analysis Neighborhood"],
          supervisorDistrict: data["Supervisor District"],
          dataAsOf: data.data_as_of,
          dataLoadedAt: data.data_loaded_at,
          sfFindNeighborhoods: data["SF Find Neighborhoods"],
          analysisNeighborhoods: data["Analysis Neighborhoods"],
          currentSupervisorDistricts: data["Current Supervisor Districts"],
        });
      })
      .on('end', () => {
        cachedMovies = results;  // cacheo los resultados
        resolve(cachedMovies);
      })
      .on('error', (err) => reject(err));
  });
};

app.get('/api/movies', async (req, res) => {
  try {
    const title = req.query.title?.toLowerCase() || '';
    const productionCompany = req.query.productionCompany?.toLowerCase() || '';
    const distributor = req.query.distributor?.toLowerCase() || '';
    const director = req.query.director?.toLowerCase() || '';
    const writer = req.query.writer?.toLowerCase() || '';
    const releaseYear = req.query.releaseYear?.toLowerCase() || '';
    const analysisNeighborhood = req.query.analysisNeighborhood?.toLowerCase() || '';

    const movies = await loadMoviesData();

    const filteredMovies = movies.filter((movie) => {
      return (
        (!title || (movie.title && movie.title.toLowerCase().includes(title))) &&
        (!productionCompany || (movie.productionCompany && movie.productionCompany.toLowerCase().includes(productionCompany))) &&
        (!distributor || (movie.distributor && movie.distributor.toLowerCase().includes(distributor))) &&
        (!director || (movie.director && movie.director.toLowerCase().includes(director))) &&
        (!writer || (movie.writer && movie.writer.toLowerCase().includes(writer))) &&
        (!releaseYear || (movie.releaseYear && movie.releaseYear.toLowerCase().includes(releaseYear))) &&
        (!analysisNeighborhood || (movie.analysisNeighborhood && movie.analysisNeighborhood.toLowerCase().includes(analysisNeighborhood)))
      );
    });

    res.json(filteredMovies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
