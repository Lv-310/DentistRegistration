using System.Web.Http;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(DentistRegistration.Startup))]

namespace DentistRegistration
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var httpConfig = new HttpConfiguration();
            WebApiConfig.Register(app, httpConfig);

        }
    }
}