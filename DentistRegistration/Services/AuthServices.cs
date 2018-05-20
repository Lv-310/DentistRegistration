using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using DentistRegistration.Constants;
using DentistRegistration.Models;
using Microsoft.IdentityModel.Tokens;

namespace DentistRegistration.Servises
{
    public class AuthServices
    {
        public string GetAccessToken(string phoneNumber)
        {
            // new Guid("37EEC6AC-CFEF-44B7-8E3B-4EA10A7A7203")
            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.MobilePhone, phoneNumber),
                    new Claim(ClaimTypes.Name, Guid.NewGuid().ToString())
                };

            var securityKey = new SymmetricSecurityKey(AllConstants.JwtTokenConstants.Secret);
            var cred = new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256Signature,
                SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                issuer: AllConstants.JwtTokenConstants.Issuer,
                audience: AllConstants.JwtTokenConstants.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(1),
                signingCredentials: cred);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GetAccessToken(AuthorizedUser user)
        {
            var claims = new List<Claim>
                {
                    new Claim("Role",user.Role),
                    new Claim("FirstName",user.FirstName),
                    new Claim("LastName",user.LastName),
                    new Claim("Id",user.Id.ToString())
                };

            var securityKey = new SymmetricSecurityKey(AllConstants.JwtTokenConstants.Secret);
            var cred = new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256Signature,
                SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                issuer: AllConstants.JwtTokenConstants.Issuer,
                audience: AllConstants.JwtTokenConstants.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: cred);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}