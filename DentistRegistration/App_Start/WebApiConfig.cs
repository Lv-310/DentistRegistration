﻿using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using DentistRegistration.Constants;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Jwt;
using Owin;

namespace DentistRegistration
{
    public static class WebApiConfig
    {
        public static void Register(IAppBuilder app, HttpConfiguration config)
        {
            // New code
            var cors = new EnableCorsAttribute("*", "*", "GET, POST, PUT");
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
        }
    }
}
