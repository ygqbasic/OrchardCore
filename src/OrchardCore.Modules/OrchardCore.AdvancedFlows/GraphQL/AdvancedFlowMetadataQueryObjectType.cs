using GraphQL.Types;
using OrchardCore.AdvancedFlows.Models;

namespace OrchardCore.AdvancedFlows.GraphQL
{
    public class AdvancedFlowMetadataQueryObjectType : ObjectGraphType<AdvancedFlowMetadata>
    {
        public FlowMetadataQueryObjectType()
        {
            Name = "AdvancedFlowMetadata";

            Field(x => x.Id, nullable: true);
            Field(x => x.CssClass, nullable: true);
        }
    }
}
