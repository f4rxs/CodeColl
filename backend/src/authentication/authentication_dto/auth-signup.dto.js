const { IsString, IsEmail, Length } = require('class-validator');

class SignUpDTO {
    @IsString()
    @Length(3, 50)
    username;

    @IsEmail()
    email;

    @IsString()
    @Length(6, 100)
    password;
}

module.exports = SignUpDTO;
