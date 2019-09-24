using Fluid;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.AdvancedFlows.Models;
using OrchardCore.Modules;
using OrchardCore.AdvancedFlows.Drivers;

namespace OrchardCore.AdvancedFlows
{
    public class Startup : StartupBase
    {
        static Startup()
        {
            TemplateContext.GlobalMemberAccessStrategy.Register<AdvancedFlowMetadata>();
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IContentDisplayDriver, AdvancedFlowMetadataDisplay>();
            services.AddContentPart<AdvancedFlowMetadata>();
        }
    }
}
