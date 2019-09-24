using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Apis;
using OrchardCore.ContentManagement.GraphQL.Queries.Types;
using OrchardCore.AdvancedFlows.Models;
using OrchardCore.Modules;

namespace OrchardCore.AdvancedFlows.GraphQL
{
    [RequireFeatures("OrchardCore.Apis.GraphQL")]
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddObjectGraphType<AdvancedFlowMetadata, AdvancedFlowMetadataQueryObjectType>();
            services.AddScoped<IContentTypeBuilder, AdvancedFlowMetadataContentTypeBuilder>();
        }
    }
}
