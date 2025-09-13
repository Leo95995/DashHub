/**
 * Service that get datas
 */

/**
 * Trending repo: 
 * https://api.github.com/search/repositories?q=stars:%3E1000&sort=stars&order=desc
 
 **/ 
/**
 *  Flusso mostro le repo + trending.
 *  Quando poi successivamente l'utente clicca su una di questa repo come oggetto
 *  allora vado a fare una chiamata all'altro endpoint che mi andrà a restituire i dati per poter
 *  realizzare un grafico dinamico e interattivos
 * 
 * GET https://api.github.com/repos/{owner}/{repo}/languages
 */


const GithubService = () => {

  // Trending repo
  const get_github_data = () => {};

  return { get_github_data };
};

export default GithubService;
