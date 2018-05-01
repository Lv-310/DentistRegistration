using System.Web.Http;
using Microsoft.Owin;
using Owin;
using System.Configuration;
using System.Web.Configuration;

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
            UnProtectSection("connectionStrings");
        }

        private void ProtectSection(string sectionName,
                                   string provider)
        {
            Configuration config =
                WebConfigurationManager.
                    OpenWebConfiguration("/");

            ConfigurationSection section =
                         config.GetSection(sectionName);

            if (section != null &&
                      !section.SectionInformation.IsProtected)
            {
                section.SectionInformation.ProtectSection(provider);
                config.Save();
            }
        }

        private void UnProtectSection(string sectionName)
        {
            Configuration config =
                WebConfigurationManager.
                    OpenWebConfiguration("/");

            ConfigurationSection section =
                      config.GetSection(sectionName);

            if (section != null &&
                  section.SectionInformation.IsProtected)
            {
                section.SectionInformation.UnprotectSection();
                config.Save();
            }
        }
    }
}