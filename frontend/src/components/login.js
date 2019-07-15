import React from 'react';

function Login() {

  return (
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i> {''}
                                Iniciar Sesión
                            </h2>

                            <form

                            >
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        required


                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password:</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required

                                    />
                                </div>

                                <input 
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    value="Inicar Sesión"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
)
}
export default Login;


