async function fetchUserRepos() {
  try {
    const res = await fetch('https://api.github.com/users/woahhcrackers/repos?per_page=100&sort=updated', {
      headers: { 'User-Agent': 'Mozilla/5.0 RetroCloud' }
    });
    console.log('GitHub API status:', res.status);
    if (res.status === 200) {
      const repos = await res.json();
      console.log('Total repos encontrados:', repos.length);
      repos.forEach(r => {
        const ghPagesUrl = r.has_pages ? `https://woahhcrackers.github.io/${r.name}/` : null;
        console.log(`\n📦 Repo: ${r.name}`);
        console.log(`   Desc: ${r.description || 'Sin descripción'}`);
        console.log(`   Página Web (Live): ${r.homepage || ghPagesUrl || 'N/A'}`);
        console.log(`   Stars: ${r.stargazers_count} | Forks: ${r.forks_count}`);
      });
    } else {
      const text = await res.text();
      console.log('API response:', text);
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

fetchUserRepos();

async function inspectRepo(repoName) {
  try {
    const res = await fetch('https://api.github.com/repos/woahhcrackers/' + repoName + '/contents', {
      headers: { 'User-Agent': 'Mozilla/5.0 RetroCloud' }
    });
    if (res.status === 200) {
      const files = await res.json();
      console.log('\n=== Archivos en ' + repoName + ' ===');
      console.log(files.map(f => f.name + ' (' + f.type + ')'));
    } else {
      console.log(repoName + ' status:', res.status);
    }
  } catch(e) {
    console.error(e.message);
  }
}

async function inspectAll() {
  await inspectRepo('GTA3Web');
  await inspectRepo('GrannyWeb');
  await inspectRepo('CupheadWeb');
  await inspectRepo('BATIMWeb');
  await inspectRepo('KSPWeb');
}

inspectAll();
