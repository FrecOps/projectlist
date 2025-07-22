// a.js - Module for loading and saving projects via PythonAnywhere Files API

// Configuration: update these values as needed
const PA_API_BASE = 'https://www.pythonanywhere.com/api/v0';
const PA_USERNAME = 'borina';
const PA_FILE_PATH = '/home/borina/FREC/GIT/projects.json';
const PA_TOKEN = "66876b634114ddae7eb34f3d971d5b263e143bef";

// SECURITY_CODE used by front-end for edit/delete/add operations
export const SECURITY_CODE = 'FREC';

/**
 * Fetch the projects.json file from PythonAnywhere using the Files API.
 * @returns {Promise<Array>} Resolves to an array of project objects.
 */
export async function loadProjects() {
  const url = `${PA_API_BASE}/user/${PA_USERNAME}/files${PA_FILE_PATH}`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${PA_TOKEN}`
    }
  });
  if (!resp.ok) {
    throw new Error(`Failed to load projects: ${resp.status} ${resp.statusText}`);
  }
  const data = await resp.json();
  return data;
}

/**
 * Save the updated projects array back to projects.json on PythonAnywhere.
 * @param {Array} projects Array of project objects to save.
 * @returns {Promise<void>} Resolves when save completes successfully.
 */
export async function saveProjects(projects) {
  const url = `${PA_API_BASE}/user/${PA_USERNAME}/files${PA_FILE_PATH}`;
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Token ${PA_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(projects)
  });
  if (!resp.ok) {
    throw new Error(`Failed to save projects: ${resp.status} ${resp.statusText}`);
  }
}
