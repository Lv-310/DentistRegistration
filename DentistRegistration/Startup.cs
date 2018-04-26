using DentistRegistration;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

[assembly: OwinStartup(typeof(Startup))]
namespace DentistRegistration
{
    public class Startup
    {
        //public static readonly byte[] Secret = Encoding.UTF8.GetBytes("E3C41047D3574F218F1DDB2C74F0D0D6");
        public void Configuration(IAppBuilder app)
        {
            var httpConfig = new HttpConfiguration();
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(app, httpConfig);
            //WebApiConfig.Register(app, httpConfig);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            //app.UseJwtBearerAuthentication(
            //    new JwtBearerAuthenticationOptions
            //    {
            //        AuthenticationMode = Microsoft.Owin.Security.AuthenticationMode.Active,
            //        AllowedAudiences = new[] { "Any" },
            //        IssuerSecurityKeyProviders = new IIssuerSecurityKeyProvider[]
            //        {
            //            new SymmetricKeyIssuerSecurityKeyProvider(Сonstans.JwtToken.Issuer, Secret)
            //        }
            //    });
        }


    }
}