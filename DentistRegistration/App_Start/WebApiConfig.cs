using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using DentistRegistration.Constants;
using DentistRegistration.DataAccessLayer;
using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using DentistRegistration.Services;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Jwt;
using Owin;
using Unity;

namespace DentistRegistration
{
    public static class WebApiConfig
    {
        public static void Register(IAppBuilder app, HttpConfiguration config)
        {
            // New code
            var cors = new EnableCorsAttribute("http://localhost:9090,http://192.168.195.144:9090", "*", "GET, POST, PUT","DELETE");
            config.EnableCors(cors);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
            config.EnableCors();

            // Web API configuration and services
            config.Formatters.JsonFormatter.SupportedMediaTypes
           .Add(new MediaTypeHeaderValue("text/html"));

            app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions
            {
                AuthenticationMode = AuthenticationMode.Active,
                AllowedAudiences = new[] { AllConstants.JwtTokenConstants.Audience },
                IssuerSecurityKeyProviders = new IIssuerSecurityKeyProvider[]
                {
                    new SymmetricKeyIssuerSecurityKeyProvider(AllConstants.JwtTokenConstants.Issuer, AllConstants.JwtTokenConstants.Secret)
                }
            });

            app.UseWebApi(config);
            
            //Redirect http tp https
            config.Filters.Add(new RequireHttpsAttribute());


            var container = new UnityContainer();
            container.RegisterType<IRepositoryCRU<Doctor>, DoctorsDAL>();
            container.RegisterType<IRepositoryCRUD<Service>, ServicesDAL>();
            container.RegisterType<IRepositoryCRU<User>, UsersDAL>();
            container.RegisterType<IRepositoryCRUcollection<CalendarEvent>, CalendarEventsDAL>();
            container.RegisterType<IRepositoryCRUD<CalendarEventRule>, CalendarEventRulesDAL>();
            container.RegisterType<ILoginDIService, LoginUserDAL>();
            container.RegisterType<IVersionDIService, VersionDAL>();
            container.RegisterType<IRepositoryCRU<VisitInfo>, VisitInfoDAL>();
            container.RegisterType<IRepositoryCRUcollection<Alergie>, AlergieDAL> ();
            container.RegisterType<IRepositoryCRUcollection<InfoField>, InfoFieldDAL>();
            container.RegisterType<IRepositoryCRU<PatientInfo>, PatientInfoDAL>();
            config.DependencyResolver = new UnityResolver(container);
            
        }
    }
}
