<template>
    <div>
      <h1>{{ message }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: '',
      };
    },
    mounted() {
      // Use the fetch API to make a GET request to the Django API
      fetch('https://klaviyo-django-758b15dfdb44.herokuapp.com/api/hello/')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();  // Convert the response to JSON
        })
        .then(data => {
          this.message = data.message;  // Assign the fetched message to the component data
        })
        .catch(error => {
          console.error('Fetch error:', error);  // Handle any errors that occurred during the request
        });
    }
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 2em;
    color: #333;
  }
  </style>
  