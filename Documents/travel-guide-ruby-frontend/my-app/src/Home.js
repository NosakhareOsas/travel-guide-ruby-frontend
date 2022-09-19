function Home(){
    return(
        <div class="has-bg-img" style={{ backgroundImage: `url(${process.env.PUBLIC_URL+ "/assets/img/digital-nomad-realities-hero.jpg"})`, 
          backgroundRepeat: 'no-repeat',  
          backgroundSize: 'cover',
          height:'100vh'  }}>
          <h2>Welcome to Technomads</h2>
          <h4>Join a global community of techies living and traveling around the world</h4>
          <div class="container-fluid">
                <form class="d-flex" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
        </div>
      
    );
}

export default Home;