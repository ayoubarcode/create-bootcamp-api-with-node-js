import React from 'react';

const ManageCourse = () => {
  return (
    <section class="container mt-5 py-5">
      <div class="row">
        <div class="col-md-8 m-auto">
          <div class="card bg-white py-2 px-4">
            <div class="card-body">
              <a
                href="manage-bootcamp.html"
                class="btn btn-link text-secondary my-3"
              >
                <i class="fas fa-chevron-left" aria-hidden="true"></i> Manage
                Bootcamp
              </a>
              <h1 class="mb-4">Manage Courses</h1>
              <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="img/image_1.jpg" class="card-img" alt="..." />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">
                        <a href="bootcamp.html">
                          Devworks Bootcamp
                          <span class="float-right badge badge-success">
                            4.9
                          </span>
                        </a>
                      </h5>
                      <span class="badge badge-dark mb-2">Boston, MA</span>
                      <p class="card-text">
                        Web Development, UI/UX, Mobile Development
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a href="add-course.html" class="btn btn-primary btn-block mb-4">
                Add Bootcamp Course
              </a>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Front End Web Development</td>
                    <td>
                      <a href="add-course.html" class="btn btn-secondary">
                        <i class="fas fa-pencil-alt" aria-hidden="true"></i>
                      </a>
                      <button class="btn btn-danger">
                        <i class="fas fa-times" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Full Stack Web Development</td>
                    <td>
                      <a href="add-course.html" class="btn btn-secondary">
                        <i class="fas fa-pencil-alt" aria-hidden="true"></i>
                      </a>
                      <button class="btn btn-danger">
                        <i class="fas fa-times" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageCourse;
