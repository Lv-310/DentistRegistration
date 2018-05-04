using System.Web.Http;
using DentistRegistration.Servises;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(DentistRegistration.Startup))]

namespace DentistRegistration
{
    public class Startup
    {
        // public static readonly byte[] Secret = Encoding.UTF8.GetBytes("E3C41047D3574F218F1DDB2C74F0D0D6");
        public void Configuration(IAppBuilder app)
        {
            var httpConfig = new HttpConfiguration();

            WebApiConfig.Register(app, httpConfig);

            // app.UseJwtBearerAuthentication(
            //    new JwtBearerAuthenticationOptions
            //    {
            //        AuthenticationMode = Microsoft.Owin.Security.AuthenticationMode.Active,
            //        AllowedAudiences = new[] { "Any" },
            //        IssuerSecurityKeyProviders = new IIssuerSecurityKeyProvider[]
            //        {
            //            new SymmetricKeyIssuerSecurityKeyProvider(Сonstans.JwtToken.Issuer, Secret)
            //        }
            //    });

            //EncryptingConfiguration.ProtectSection("connectionStrings", "DataProtectionConfigurationProvider");
        }
    }
}