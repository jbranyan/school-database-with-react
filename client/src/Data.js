import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  //Function to get the user information for the credentials entered
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  //function to create a new user from the information entered on the userSignUp component
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //Function to get all the courses
  async getCourses() {
    const response = await this.api(`/courses`);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    }
  }
  //Function to get a specific course related to the id passed in
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    }
  }

  //function to delete a specific course using the course id
  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null,  true,{ username, password });
      if (response.status === 204) {
        return [];
      } else if (response.status === 400) {
        return response.json().then(data => {
          return data.errors;
        });
      } else {
        throw new Error();
      }
  }
  //function to create a course from the information entered on the create course form
  async createCourse(course, username, password) {
    const response = await this.api('/courses', 'POST', course, true, { username, password });

    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //function to update a specific course
  async updateCourse(course, id, username, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { username, password });

    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

}
