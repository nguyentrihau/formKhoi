import React, { PureComponent } from "react";
import { connect } from "react-redux";

class FormUser extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        id: "",
        name: "",
        phone: "",
        email: "",
      },

      errors: {
        id: "",
        name: "",
        phone: "",
        email: "",
      },

      valid: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.editUser.id &&
      prevProps.editUser.id !== this.props.editUser.id
    ) {
      this.setState({
        values: this.props.editUser,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.addUser();
  };

  addUser = () => {
    let newArr = [...this.props.arrUser];
    newArr.push({ ...this.state.values });
    const action = {
      type: "ADD_USER",
      payload: newArr,
    };

    this.props.dispatch(action);
  };

  updateUser = () => {
    const action = {
      type: "UPDATE_USER",
      payload: {
        id: this.state.values.id,
        name: this.state.values.name,
        phone: this.state.values.phone,
        email: this.state.values.email,
      },
    };
    this.props.dispatch( action );
  };

  checkValidSubmit = () => {
    let values = { ...this.state.values };
    let errors = { ...this.state.errors };
    for (let key in values) {
      if (errors[key] !== "" || values[key] === "") {
        return false;
      }
    }
    return true;
  };

  handleInput = (e) => {
    const { id, value } = e.target;
    let newValues = { ...this.state.values };
    let newErrors = { ...this.state.errors };

    newValues[id] = value;

    let message = "";
    let dataType = e.target.getAttribute("data-type");
    let maxLength = e.target.getAttribute("data-max-length");

    if (value.trim() === "") {
      message = id + " cannot be blank !";
    } else {
      if (dataType === "letter") {
        let regexLetter =
          /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/;
        if (!regexLetter.test(value)) {
          message = id + " is invalid !";
        }
      }

      if (dataType === "number") {
        let regexNumber = /^[0-9]+$/;
        if (!regexNumber.test(value)) {
          message = id + " is invalid !";
        }
      }

      if (dataType === "email") {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regexEmail.test(value)) {
          message = id + " is invalid !";
        }
      }

      if (maxLength !== null && value.length > maxLength) {
        message = id + ` không vượt quá ${maxLength} ký tự`;
      }
    }
    newErrors[id] = message;

    this.setState(
      {
        values: newValues,
        errors: newErrors,
      },
      () => {
        this.setState({
          valid: this.checkValidSubmit(),
        });
      }
    );
  };

  render() {
    let { id, name, phone, email } = this.state.errors;
    let { values } = this.state;
    return (
      <>
        <form className="card" onSubmit={this.handleSubmit}>
          <h3 className="card-header bg-dark text-light">
            Thông tin sinh viên
          </h3>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <p className="mb-0 mt-3">Mã SV</p>
                  <input
                    className="w-100"
                    id="id"
                    type="text"
                    onInput={this.handleInput}
                    data-type="number"
                    data-max-length="6"
                    value={values.id}
                    disabled={!!this.props.editUser.id}
                  />
                  {id && <div className="alert alert-danger">{id}</div>}
                </div>
                <div className="form-group">
                  <p className="mb-0 mt-3">Số điện thoại</p>
                  <input
                    className="w-100"
                    id="phone"
                    type="text"
                    onInput={this.handleInput}
                    data-type="number"
                    value={values.phone}
                  />
                  {phone && <div className="alert alert-danger">{phone}</div>}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p className="mb-0 mt-3">Họ tên</p>
                  <input
                    className="w-100"
                    id="name"
                    type="text"
                    onInput={this.handleInput}
                    data-type="letter"
                    value={values.name}
                  />
                  {name && <div className="alert alert-danger">{name}</div>}
                </div>
                <div className="form-group">
                  <p className="mb-0 mt-3">Email</p>
                  <input
                    className="w-100"
                    id="email"
                    type="text"
                    onInput={this.handleInput}
                    data-type="email"
                    value={values.email}
                  />
                  {email && <div className="alert alert-danger">{email}</div>}
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button
              type="submit"
              className="btn btn-success mx-2"
              disabled={!this.state.valid || !!this.props.editUser.id}
            >
              Thêm sinh viên
            </button>
            <button
              type="submit"
              className="btn btn-warning mx-2"
              style={
                this.props.editUser.id
                  ? { display: "inline-block" }
                  : { display: "none" }
              }
              onClick={() => {
                this.updateUser();
              }}
            >
              Cập nhật
            </button>
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  arrUser: state.userReducer.arrUser,
  editUser: state.userReducer.editUser,
});

export default connect(mapStateToProps)(FormUser);
