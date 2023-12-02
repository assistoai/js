import { StartFrom } from '@typebot.io/schemas';
export declare function startChatQuery({ typebot, isPreview, apiHost, prefilledVariables, resultId, stripeRedirectStatus, startFrom, }: {
    typebot: string | any;
    stripeRedirectStatus?: string;
    apiHost?: string;
    startFrom?: StartFrom;
    isPreview: boolean;
    prefilledVariables?: Record<string, unknown>;
    resultId?: string;
}): Promise<{
    data: {
        typebot: {
            id: string;
            theme: {
                general?: {
                    font?: string | undefined;
                    background?: {
                        type?: import("@typebot.io/schemas/features/typebot/theme/constants").BackgroundType | undefined;
                        content?: string | undefined;
                    } | undefined;
                } | undefined;
                chat?: {
                    hostAvatar?: {
                        isEnabled?: boolean | undefined;
                        url?: string | undefined;
                    } | undefined;
                    guestAvatar?: {
                        isEnabled?: boolean | undefined;
                        url?: string | undefined;
                    } | undefined;
                    hostBubbles?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                    } | undefined;
                    guestBubbles?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                    } | undefined;
                    buttons?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                    } | undefined;
                    inputs?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        placeholderColor?: string | undefined;
                    } | undefined;
                    roundness?: "medium" | "large" | "none" | undefined;
                } | undefined;
                customCss?: string | undefined;
            };
            settings: {
                general?: {
                    isBrandingEnabled?: boolean | undefined;
                    isTypingEmulationEnabled?: boolean | undefined;
                    isInputPrefillEnabled?: boolean | undefined;
                    isHideQueryParamsEnabled?: boolean | undefined;
                    isNewResultOnRefreshEnabled?: boolean | undefined;
                    rememberUser?: {
                        isEnabled?: boolean | undefined;
                        storage?: "session" | "local" | undefined;
                    } | undefined;
                } | undefined;
                typingEmulation?: {
                    enabled?: boolean | undefined;
                    speed?: number | undefined;
                    maxDelay?: number | undefined;
                } | undefined;
                metadata?: {
                    title?: string | undefined;
                    description?: string | undefined;
                    imageUrl?: string | undefined;
                    favIconUrl?: string | undefined;
                    customHeadCode?: string | undefined;
                    googleTagManagerId?: string | undefined;
                } | undefined;
                whatsApp?: {
                    isEnabled?: boolean | undefined;
                    startCondition?: {
                        logicalOperator: import("@typebot.io/schemas/features/blocks/logic/condition/constants").LogicalOperator;
                        comparisons: {
                            id: string;
                            comparisonOperator?: import("@typebot.io/schemas/features/blocks/logic/condition/constants").ComparisonOperators | undefined;
                            value?: string | undefined;
                        }[];
                    } | undefined;
                    sessionExpiryTimeout?: number | undefined;
                } | undefined;
                publicShare?: {
                    isEnabled?: boolean | undefined;
                } | undefined;
            };
        };
        messages: ({
            id: string;
        } & ({
            type: import("@typebot.io/schemas/features/blocks/bubbles/constants").BubbleBlockType.TEXT;
            content: {
                html?: string | undefined;
                richText?: any[] | undefined;
                plainText?: string | undefined;
            };
        } | {
            type: import("@typebot.io/schemas/features/blocks/bubbles/constants").BubbleBlockType.IMAGE;
            content: {
                url?: string | undefined;
                clickLink?: {
                    url?: string | undefined;
                    alt?: string | undefined;
                } | undefined;
            };
        } | {
            type: import("@typebot.io/schemas/features/blocks/bubbles/constants").BubbleBlockType.VIDEO;
            content: {
                url?: string | undefined;
                id?: string | undefined;
                type?: import("@typebot.io/schemas/features/blocks/bubbles/video/constants").VideoBubbleContentType | undefined;
                height?: number | `{{${string}}}` | undefined;
                aspectRatio?: string | undefined;
                maxWidth?: string | undefined;
            };
        } | {
            type: import("@typebot.io/schemas/features/blocks/bubbles/constants").BubbleBlockType.AUDIO;
            content: {
                url?: string | undefined;
                isAutoplayEnabled?: boolean | undefined;
            };
        } | {
            type: import("@typebot.io/schemas/features/blocks/bubbles/constants").BubbleBlockType.EMBED;
            content: {
                url?: string | undefined;
                height?: number | undefined;
            };
        }))[];
        input?: (({
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.CHOICE;
            items: {
                id: string;
                outgoingEdgeId?: string | undefined;
                blockId?: string | undefined;
                content?: string | undefined;
                displayCondition?: {
                    isEnabled?: boolean | undefined;
                    condition?: {
                        logicalOperator?: import("@typebot.io/schemas/features/blocks/logic/condition/constants").LogicalOperator | undefined;
                        comparisons?: {
                            id: string;
                            variableId?: string | undefined;
                            comparisonOperator?: import("@typebot.io/schemas/features/blocks/logic/condition/constants").ComparisonOperators | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                } | undefined;
            }[];
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                isMultipleChoice?: boolean | undefined;
                buttonLabel?: string | undefined;
                dynamicVariableId?: string | undefined;
                isSearchable?: boolean | undefined;
                searchInputPlaceholder?: string | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.CHOICE;
            items: {
                id: string;
                outgoingEdgeId?: string | undefined;
                content?: string | undefined;
                displayCondition?: {
                    isEnabled?: boolean | undefined;
                    condition?: {
                        logicalOperator?: import("@typebot.io/schemas/features/blocks/logic/condition/constants").LogicalOperator | undefined;
                        comparisons?: {
                            id: string;
                            variableId?: string | undefined;
                            comparisonOperator?: import("@typebot.io/schemas/features/blocks/logic/condition/constants").ComparisonOperators | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                } | undefined;
            }[];
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                isMultipleChoice?: boolean | undefined;
                buttonLabel?: string | undefined;
                dynamicVariableId?: string | undefined;
                isSearchable?: boolean | undefined;
                searchInputPlaceholder?: string | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.DATE;
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                labels?: {
                    button?: string | undefined;
                    from?: string | undefined;
                    to?: string | undefined;
                } | undefined;
                hasTime?: boolean | undefined;
                isRange?: boolean | undefined;
                format?: string | undefined;
                min?: string | undefined;
                max?: string | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.TEXT;
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                labels?: {
                    placeholder?: string | undefined;
                    button?: string | undefined;
                } | undefined;
                isLong?: boolean | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.EMAIL;
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                labels?: {
                    placeholder?: string | undefined;
                    button?: string | undefined;
                } | undefined;
                retryMessageContent?: string | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.FILE;
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                isRequired?: boolean | undefined;
                isMultipleAllowed?: boolean | undefined;
                labels?: {
                    placeholder?: string | undefined;
                    button?: string | undefined;
                    clear?: string | undefined;
                    skip?: string | undefined;
                } | undefined;
                sizeLimit?: number | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.FILE;
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                labels?: {
                    placeholder?: string | undefined;
                    button?: string | undefined;
                    clear?: string | undefined;
                    skip?: string | undefined;
                } | undefined;
                isRequired?: boolean | undefined;
                isMultipleAllowed?: boolean | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.NUMBER;
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                labels?: {
                    placeholder?: string | undefined;
                    button?: string | undefined;
                } | undefined;
                min?: number | `{{${string}}}` | undefined;
                max?: number | `{{${string}}}` | undefined;
                step?: number | `{{${string}}}` | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.PAYMENT;
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                provider?: import("@typebot.io/schemas/features/blocks/inputs/payment/constants").PaymentProvider.STRIPE | undefined;
                labels?: {
                    button?: string | undefined;
                    success?: string | undefined;
                } | undefined;
                additionalInformation?: {
                    description?: string | undefined;
                    name?: string | undefined;
                    email?: string | undefined;
                    phoneNumber?: string | undefined;
                    address?: {
                        country?: string | undefined;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        state?: string | undefined;
                        city?: string | undefined;
                        postalCode?: string | undefined;
                    } | undefined;
                } | undefined;
                credentialsId?: string | undefined;
                currency?: string | undefined;
                amount?: string | undefined;
                retryMessageContent?: string | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.PHONE;
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                labels?: {
                    placeholder?: string | undefined;
                    button?: string | undefined;
                } | undefined;
                retryMessageContent?: string | undefined;
                defaultCountryCode?: string | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.RATING;
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                buttonType?: "Icons" | "Numbers" | undefined;
                length?: number | undefined;
                labels?: {
                    left?: string | undefined;
                    right?: string | undefined;
                    button?: string | undefined;
                } | undefined;
                customIcon?: {
                    isEnabled?: boolean | undefined;
                    svg?: string | undefined;
                } | undefined;
                isOneClickSubmitEnabled?: boolean | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.URL;
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                labels?: {
                    placeholder?: string | undefined;
                    button?: string | undefined;
                } | undefined;
                retryMessageContent?: string | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.PICTURE_CHOICE;
            items: {
                id: string;
                outgoingEdgeId?: string | undefined;
                blockId?: string | undefined;
                pictureSrc?: string | undefined;
                title?: string | undefined;
                description?: string | undefined;
                displayCondition?: {
                    isEnabled?: boolean | undefined;
                    condition?: {
                        logicalOperator?: import("@typebot.io/schemas/features/blocks/logic/condition/constants").LogicalOperator | undefined;
                        comparisons?: {
                            id: string;
                            variableId?: string | undefined;
                            comparisonOperator?: import("@typebot.io/schemas/features/blocks/logic/condition/constants").ComparisonOperators | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                } | undefined;
            }[];
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                isMultipleChoice?: boolean | undefined;
                isSearchable?: boolean | undefined;
                buttonLabel?: string | undefined;
                searchInputPlaceholder?: string | undefined;
                dynamicItems?: {
                    isEnabled?: boolean | undefined;
                    titlesVariableId?: string | undefined;
                    descriptionsVariableId?: string | undefined;
                    pictureSrcsVariableId?: string | undefined;
                } | undefined;
            } | undefined;
        } | {
            id: string;
            type: import("@typebot.io/schemas/features/blocks/inputs/constants").InputBlockType.PICTURE_CHOICE;
            items: {
                id: string;
                outgoingEdgeId?: string | undefined;
                pictureSrc?: string | undefined;
                title?: string | undefined;
                description?: string | undefined;
                displayCondition?: {
                    isEnabled?: boolean | undefined;
                    condition?: {
                        logicalOperator?: import("@typebot.io/schemas/features/blocks/logic/condition/constants").LogicalOperator | undefined;
                        comparisons?: {
                            id: string;
                            variableId?: string | undefined;
                            comparisonOperator?: import("@typebot.io/schemas/features/blocks/logic/condition/constants").ComparisonOperators | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                } | undefined;
            }[];
            outgoingEdgeId?: string | undefined;
            options?: {
                variableId?: string | undefined;
                isMultipleChoice?: boolean | undefined;
                isSearchable?: boolean | undefined;
                buttonLabel?: string | undefined;
                searchInputPlaceholder?: string | undefined;
                dynamicItems?: {
                    isEnabled?: boolean | undefined;
                    titlesVariableId?: string | undefined;
                    descriptionsVariableId?: string | undefined;
                    pictureSrcsVariableId?: string | undefined;
                } | undefined;
            } | undefined;
        }) & {
            prefilledValue?: string | undefined;
            runtimeOptions?: {
                paymentIntentSecret: string;
                amountLabel: string;
                publicKey: string;
            } | undefined;
        }) | undefined;
        logs?: {
            status: string;
            description: string;
            details?: unknown;
        }[] | undefined;
        dynamicTheme?: {
            hostAvatarUrl?: string | undefined;
            guestAvatarUrl?: string | undefined;
        } | undefined;
        lastMessageNewFormat?: string | undefined;
        clientSideActions?: ({
            lastBubbleBlockId?: string | undefined;
            expectsDedicatedReply?: boolean | undefined;
        } & ({
            scriptToExecute: {
                content: string;
                args: {
                    id: string;
                    value?: string | number | boolean | (string | null)[] | null | undefined;
                }[];
            };
        } | {
            redirect: {
                url?: string | undefined;
                isNewTab?: boolean | undefined;
            };
        } | {
            chatwoot: {
                scriptToExecute: {
                    content: string;
                    args: {
                        id: string;
                        value?: string | number | boolean | (string | null)[] | null | undefined;
                    }[];
                };
            };
        } | {
            googleAnalytics: {
                trackingId?: string | undefined;
                category?: string | undefined;
                action?: string | undefined;
                label?: string | undefined;
                value?: number | `{{${string}}}` | undefined;
                sendTo?: string | undefined;
            };
        } | {
            wait: {
                secondsToWaitFor: number;
            };
        } | {
            setVariable: {
                scriptToExecute: {
                    content: string;
                    args: {
                        id: string;
                        value?: string | number | boolean | (string | null)[] | null | undefined;
                    }[];
                };
            };
        } | {
            streamOpenAiChatCompletion: {
                messages: {
                    content?: string | undefined;
                    role?: "user" | "system" | "assistant" | undefined;
                }[];
            };
        } | {
            webhookToExecute: {
                url: string;
                headers?: Record<string, string> | undefined;
                body?: unknown;
                method?: import("@typebot.io/schemas/features/blocks/integrations/webhook/constants").HttpMethod | undefined;
            };
        } | {
            startPropsToInject: {
                googleAnalyticsId?: string | undefined;
                pixelIds?: string[] | undefined;
                gtmId?: string | undefined;
                customHeadCode?: string | undefined;
            };
        } | {
            pixel: {
                params?: {
                    id: string;
                    key?: string | undefined;
                    value?: any;
                }[] | undefined;
                pixelId?: string | undefined;
                isInitSkip?: boolean | undefined;
                eventType?: undefined;
            } | {
                eventType: "Lead" | "Contact" | "CompleteRegistration" | "Schedule" | "SubmitApplication" | "ViewContent" | "AddPaymentInfo" | "AddToCart" | "AddToWishlist" | "CustomizeProduct" | "Donate" | "FindLocation" | "InitiateCheckout" | "Purchase" | "Search" | "StartTrial" | "Subscribe";
                params?: {
                    id: string;
                    key?: string | undefined;
                    value?: any;
                }[] | undefined;
                pixelId?: string | undefined;
                isInitSkip?: boolean | undefined;
            } | {
                eventType: "Custom";
                params?: {
                    id: string;
                    key?: string | undefined;
                    value?: any;
                }[] | undefined;
                pixelId?: string | undefined;
                isInitSkip?: boolean | undefined;
                name?: string | undefined;
            };
        }))[] | undefined;
        sessionId: string;
        resultId?: string | undefined;
    } | undefined;
    error: Error | undefined;
    response: Response | undefined;
}>;
//# sourceMappingURL=startChatQuery.d.ts.map