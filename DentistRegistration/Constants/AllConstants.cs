using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace DentistRegistration.Constants
{
    internal class AllConstants
    {
        /// <summary>
        /// Constans for JwtToken class
        /// </summary>
        internal static class JwtTokenConstants
        {
            public const string Issuer = "http://localhost:9090/";
            public const string Audience = "Any";
            public static readonly byte[] Secret = Encoding.UTF8.GetBytes("E3C41047D3574F218F1DDB2C74F0D0D6");
        }
    }
}