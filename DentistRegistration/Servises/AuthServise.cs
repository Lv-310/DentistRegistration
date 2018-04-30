using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using DentistRegistration.Constants;
using Microsoft.IdentityModel.Tokens;

namespace DentistRegistration.Servises
{
    public class AuthServise
    {
        public string GetAccessToken(string firstName, string password)
        {
            // new Guid("37EEC6AC-CFEF-44B7-8E3B-4EA10A7A7203")
            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, firstName),
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
                expires: DateTime.Now.AddMinutes(2),
                signingCredentials: cred);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}