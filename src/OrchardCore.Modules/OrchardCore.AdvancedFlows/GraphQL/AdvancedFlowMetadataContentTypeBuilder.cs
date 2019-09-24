using GraphQL.Types;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.GraphQL;
using OrchardCore.ContentManagement.GraphQL.Queries.Types;
using OrchardCore.ContentManagement.Metadata.Models;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.AdvancedFlows.Models;

namespace OrchardCore.AdvancedFlows.GraphQL
{
    public class AdvancedFlowMetadataContentTypeBuilder : IContentTypeBuilder
    {
        public void Build(FieldType contentQuery, ContentTypeDefinition contentTypeDefinition, ContentItemType contentItemType)
        {
            var settings = contentTypeDefinition.GetSettings<ContentTypeSettings>();

            if (settings.Stereotype != "Widget") return;

            contentItemType.Field<AdvancedFlowMetadataQueryObjectType>(
                "metadata",
                resolve: context => context.Source.As<AdvancedFlowMetadata>()
            );
        }
    }
}
