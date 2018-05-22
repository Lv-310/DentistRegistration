using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Filters;
using System.Web.Http.Results;

namespace DentistRegistration.Services
{
    public class TokenAuthenticationAttribute :Attribute, IAuthenticationFilter
    {
        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var req = context.Request;
            // Получаем удостоверение из заголовка Authorization
            // (если есть) и выполняем аутентификацию
            if (req.Headers.Authorization != null &&
              "somescheme".Equals(req.Headers.Authorization.Scheme,
                StringComparison.OrdinalIgnoreCase))
            {
                var creds = req.Headers.Authorization.Parameter;
                if (creds == "opensesame") // заменить настоящей проверкой
                {
                    var claims = new List<Claim>()
      {
        new Claim(ClaimTypes.MobilePhone, "badri"),
        new Claim(ClaimTypes.Role, "admin")
      };
                    var id = new ClaimsIdentity(claims, "Token");
                    var principal = new ClaimsPrincipal(new[] { id });
                    // Сообщение-запрос содержит правильные удостоверенияl
                    context.Principal = principal;
                }
                else
                {
                    // Сообщение-запрос содержит неправильное удостоверение
                    context.ErrorResult = new UnauthorizedResult(
                      new AuthenticationHeaderValue[0], context.Request);
                }
            }
            return Task.FromResult(0);
        }
        public Task ChallengeAsync(HttpAuthenticationChallengeContext context,
  CancellationToken cancellationToken)
        {
            context.Result = new ResultWithChallenge(context.Result);
            return Task.FromResult(0);
        }
        public class ResultWithChallenge : IHttpActionResult
        {
            private readonly IHttpActionResult next;
            public ResultWithChallenge(IHttpActionResult next)
            {
                this.next = next;
            }
            public async Task<HttpResponseMessage> ExecuteAsync(
              CancellationToken cancellationToken)
            {
                var response = await next.ExecuteAsync(cancellationToken);
                if (response.StatusCode == HttpStatusCode.Unauthorized)
                {
                    response.Headers.WwwAuthenticate.Add(
                      new AuthenticationHeaderValue("somescheme", "somechallenge"));
                }
                return response;
            }
        }
        public bool AllowMultiple
        {
            get { return false; }
        }
    }
}