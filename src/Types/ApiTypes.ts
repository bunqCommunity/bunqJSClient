export interface IWhitelistSddUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IWhitelistSddRead {
  /**
   * The ID of the whitelist entry.
   */
  readonly id?: number;
  /**
   * The account to which payments will come in before possibly being 'redirected' by the whitelist.
   */
  readonly monetary_account_incoming_id?: number;
  /**
   * The account from which payments will be deducted when a transaction is matched with this whitelist.
   */
  readonly monetary_account_paying_id?: number;
  /**
   * The type of the SDD whitelist, can be CORE or B2B.
   */
  readonly type?: string;
  /**
   * The status of the whitelist.
   */
  readonly status?: string;
  /**
   * The credit scheme ID provided by the counterparty.
   */
  readonly credit_scheme_identifier?: string;
  /**
   * The mandate ID provided by the counterparty.
   */
  readonly mandate_identifier?: string;
  /**
   * The account to which payments will be paid.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The monthly maximum amount that can be deducted from the target account.
   */
  readonly maximum_amount_per_month?: IAmount;
  /**
   * The user who created the whitelist entry.
   */
  readonly user_alias_created?: ILabelUser;
}

export interface IWhitelistSddListing {
  /**
   * The ID of the whitelist entry.
   */
  readonly id?: number;
  /**
   * The account to which payments will come in before possibly being 'redirected' by the whitelist.
   */
  readonly monetary_account_incoming_id?: number;
  /**
   * The account from which payments will be deducted when a transaction is matched with this whitelist.
   */
  readonly monetary_account_paying_id?: number;
  /**
   * The type of the SDD whitelist, can be CORE or B2B.
   */
  readonly type?: string;
  /**
   * The status of the whitelist.
   */
  readonly status?: string;
  /**
   * The credit scheme ID provided by the counterparty.
   */
  readonly credit_scheme_identifier?: string;
  /**
   * The mandate ID provided by the counterparty.
   */
  readonly mandate_identifier?: string;
  /**
   * The account to which payments will be paid.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The monthly maximum amount that can be deducted from the target account.
   */
  readonly maximum_amount_per_month?: IAmount;
  /**
   * The user who created the whitelist entry.
   */
  readonly user_alias_created?: ILabelUser;
}

export interface IWhitelistSddDelete {}

export interface IWhitelistSddCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IWhitelistSdd {
  /**
   * ID of the monetary account of which you want to pay from.
   */
  monetary_account_paying_id: number;
  /**
   * ID of the request for which you want to whitelist the originating SDD.
   */
  request_id: number;
  /**
   * The maximum amount of money that is allowed to be deducted based on the whitelist.
   */
  maximum_amount_per_month: IAmount;
}

export interface IWhitelistResultViewAnchoredObject {
  /**
   * The ID of the whitelist entry.
   */
  readonly id?: number;
  /**
   * The RequestResponse object
   */
  readonly requestResponse?: IRequestResponse;
  /**
   * The DraftPayment object
   */
  readonly draftPayment?: IDraftPayment;
}

export interface IWhitelistResult {
  /**
   * The ID of the whitelist entry.
   */
  readonly id?: number;
  /**
   * The account from which payments will be deducted when a transaction is matched with this whitelist.
   */
  readonly monetary_account_paying_id?: number;
  /**
   * The status of the WhitelistResult.
   */
  readonly status?: string;
  /**
   * The subStatus of the WhitelistResult.
   */
  readonly sub_status?: string;
  /**
   * The message when the whitelist result has failed due to user error.
   */
  readonly error_message?: Array<Error>;
  /**
   * The corresponding whitelist.
   */
  readonly whitelist?: IWhitelist;
  /**
   * The details of the external object the event was created for.
   */
  readonly object?: IWhitelistResultViewAnchoredObject;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface IWhitelist {}

export interface IUserRead {
  /**
   *
   */
  readonly UserLight?: IUserLight;
  /**
   *
   */
  readonly UserPerson?: IUserPerson;
  /**
   *
   */
  readonly UserCompany?: IUserCompany;
  /**
   *
   */
  readonly UserApiKey?: IUserApiKey;
  /**
   *
   */
  readonly UserPaymentServiceProvider?: IUserPaymentServiceProvider;
}

export interface IUserPersonUpdate {
  /**
   * The id of the modified person object.
   */
  readonly id?: number;
}

export interface IUserPersonRead {
  /**
   * The id of the modified person object.
   */
  readonly id?: number;
  /**
   * The timestamp of the person object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the person object's last update.
   */
  readonly updated?: string;
  /**
   * The person's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The person's first name.
   */
  readonly first_name?: string;
  /**
   * The person's middle name.
   */
  readonly middle_name?: string;
  /**
   * The person's last name.
   */
  readonly last_name?: string;
  /**
   * The person's legal name.
   */
  readonly legal_name?: string;
  /**
   * The display name for the person.
   */
  readonly display_name?: string;
  /**
   * The public nick name for the person.
   */
  readonly public_nick_name?: string;
  /**
   * The aliases of the user.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The user's tax residence numbers for different countries.
   */
  readonly tax_resident?: Array<ITaxResident>;
  /**
   * The type of identification document the person registered with.
   */
  readonly document_type?: string;
  /**
   * The identification document number the person registered with.
   */
  readonly document_number?: string;
  /**
   * The country which issued the identification document the person registered with.
   */
  readonly document_country_of_issuance?: string;
  /**
   * The person's main address.
   */
  readonly address_main?: IAddress;
  /**
   * The person's postal address.
   */
  readonly address_postal?: IAddress;
  /**
   * The person's date of birth. Accepts ISO8601 date formats.
   */
  readonly date_of_birth?: string;
  /**
   * The person's place of birth.
   */
  readonly place_of_birth?: string;
  /**
   * The person's country of birth. Formatted as a SO 3166-1 alpha-2 country code.
   */
  readonly country_of_birth?: string;
  /**
   * The person's nationality. Formatted as a SO 3166-1 alpha-2 country code.
   */
  readonly nationality?: string;
  /**
   * The person's preferred language. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, seperated by an underscore.
   */
  readonly language?: string;
  /**
   * The person's preferred region. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, seperated by an underscore.
   */
  readonly region?: string;
  /**
   * The person's gender. Can be MALE, FEMALE or UNKNOWN.
   */
  readonly gender?: string;
  /**
   * The user's avatar.
   */
  readonly avatar?: IAvatar;
  /**
   * The version of the terms of service accepted by the user.
   */
  readonly version_terms_of_service?: string;
  /**
   * The user status. The user status. Can be: ACTIVE, BLOCKED, SIGNUP, RECOVERY, DENIED or ABORTED.
   */
  readonly status?: string;
  /**
   * The user sub-status. Can be: NONE, FACE_RESET, APPROVAL, APPROVAL_DIRECTOR, APPROVAL_PARENT, APPROVAL_SUPPORT, COUNTER_IBAN, IDEAL or SUBMIT.
   */
  readonly sub_status?: string;
  /**
   * The setting for the session timeout of the user in seconds.
   */
  readonly session_timeout?: number;
  /**
   * The amount the user can pay in the session without asking for credentials.
   */
  readonly daily_limit_without_confirmation_login?: IAmount;
  /**
   * The types of notifications that will result in a push notification or URL callback for this UserPerson.
   */
  readonly notification_filters?: Array<INotificationFilter>;
}

export interface IUserPerson {
  /**
   * The person's first name.
   */
  first_name?: string;
  /**
   * The person's middle name.
   */
  middle_name?: string;
  /**
   * The person's last name.
   */
  last_name?: string;
  /**
   * The public nick name for the person.
   */
  public_nick_name?: string;
  /**
   * The person's main address.
   */
  address_main?: IAddress;
  /**
   * The person's postal address.
   */
  address_postal?: IAddress;
  /**
   * The public UUID of the user's avatar.
   */
  avatar_uuid: string;
  /**
   * The user's tax residence numbers for different countries.
   */
  tax_resident?: Array<ITaxResident>;
  /**
   * The type of identification document the person registered with.
   */
  document_type?: string;
  /**
   * The identification document number the person registered with.
   */
  document_number?: string;
  /**
   * The country which issued the identification document the person registered with.
   */
  document_country_of_issuance?: string;
  /**
   * The reference to the uploaded picture/scan of the front side of the identification document.
   */
  document_front_attachment_id: number;
  /**
   * The reference to the uploaded picture/scan of the back side of the identification document.
   */
  document_back_attachment_id?: number;
  /**
   * The person's date of birth. Accepts ISO8601 date formats.
   */
  date_of_birth?: string;
  /**
   * The person's place of birth.
   */
  place_of_birth?: string;
  /**
   * The person's country of birth. Formatted as a SO 3166-1 alpha-2 country code.
   */
  country_of_birth?: string;
  /**
   * The person's nationality. Formatted as a SO 3166-1 alpha-2 country code.
   */
  nationality?: string;
  /**
   * The person's preferred language. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, seperated by an underscore.
   */
  language?: string;
  /**
   * The person's preferred region. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, seperated by an underscore.
   */
  region?: string;
  /**
   * The person's gender. Can be MALE, FEMALE or UNKNOWN.
   */
  gender?: string;
  /**
   * The user status. The user status. Can be: ACTIVE, BLOCKED, SIGNUP, RECOVERY, DENIED or ABORTED.
   */
  status?: string;
  /**
   * The user sub-status. Can be: NONE, FACE_RESET, APPROVAL, APPROVAL_DIRECTOR, APPROVAL_PARENT, APPROVAL_SUPPORT, COUNTER_IBAN, IDEAL or SUBMIT.
   */
  sub_status?: string;
  /**
   * The legal guardian of the user. Required for minors.
   */
  legal_guardian_alias: IPointer;
  /**
   * The setting for the session timeout of the user in seconds.
   */
  session_timeout?: number;
  /**
   * The amount the user can pay in the session without asking for credentials.
   */
  daily_limit_without_confirmation_login?: IAmount;
  /**
   * The display name for the person.
   */
  display_name?: string;
  /**
   * The id of the modified person object.
   */
  readonly id?: number;
  /**
   * The timestamp of the person object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the person object's last update.
   */
  readonly updated?: string;
  /**
   * The person's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The person's legal name.
   */
  readonly legal_name?: string;
  /**
   * The aliases of the user.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The user's avatar.
   */
  readonly avatar?: IAvatar;
  /**
   * The version of the terms of service accepted by the user.
   */
  readonly version_terms_of_service?: string;
  /**
   * The types of notifications that will result in a push notification or URL callback for this UserPerson.
   */
  readonly notification_filters?: Array<INotificationFilter>;
}

export interface IUserPaymentServiceProviderRead {
  /**
   * The id of the user.
   */
  readonly id?: number;
  /**
   * The timestamp of the user object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the user object's last update.
   */
  readonly updated?: string;
  /**
   * The distinguished name from the certificate used to identify this user.
   */
  readonly certificate_distinguished_name?: string;
  /**
   * The aliases of the user.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The user's avatar.
   */
  readonly avatar?: IAvatar;
  /**
   * The user status. The user status. Can be: ACTIVE, BLOCKED or DENIED.
   */
  readonly status?: string;
  /**
   * The user sub-status. Can be: NONE
   */
  readonly sub_status?: string;
  /**
   * The providers's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The display name for the provider.
   */
  readonly display_name?: string;
  /**
   * The public nick name for the provider.
   */
  readonly public_nick_name?: string;
  /**
   * The provider's language. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, separated by an underscore.
   */
  readonly language?: string;
  /**
   * The provider's region. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, separated by an underscore.
   */
  readonly region?: string;
  /**
   * The setting for the session timeout of the user in seconds.
   */
  readonly session_timeout?: number;
}

export interface IUserPaymentServiceProvider {
  /**
   * The id of the user.
   */
  readonly id?: number;
  /**
   * The timestamp of the user object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the user object's last update.
   */
  readonly updated?: string;
  /**
   * The distinguished name from the certificate used to identify this user.
   */
  readonly certificate_distinguished_name?: string;
  /**
   * The aliases of the user.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The user's avatar.
   */
  readonly avatar?: IAvatar;
  /**
   * The user status. The user status. Can be: ACTIVE, BLOCKED or DENIED.
   */
  readonly status?: string;
  /**
   * The user sub-status. Can be: NONE
   */
  readonly sub_status?: string;
  /**
   * The providers's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The display name for the provider.
   */
  readonly display_name?: string;
  /**
   * The public nick name for the provider.
   */
  readonly public_nick_name?: string;
  /**
   * The provider's language. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, separated by an underscore.
   */
  readonly language?: string;
  /**
   * The provider's region. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, separated by an underscore.
   */
  readonly region?: string;
  /**
   * The setting for the session timeout of the user in seconds.
   */
  readonly session_timeout?: number;
}

export interface IUserListing {
  /**
   *
   */
  readonly UserLight?: IUserLight;
  /**
   *
   */
  readonly UserPerson?: IUserPerson;
  /**
   *
   */
  readonly UserCompany?: IUserCompany;
  /**
   *
   */
  readonly UserApiKey?: IUserApiKey;
  /**
   *
   */
  readonly UserPaymentServiceProvider?: IUserPaymentServiceProvider;
}

export interface IUserLight {
  /**
   * The user's first name.
   */
  first_name?: string;
  /**
   * The user's middle name.
   */
  middle_name?: string;
  /**
   * The user's last name.
   */
  last_name?: string;
  /**
   * The public nick name for the user.
   */
  public_nick_name?: string;
  /**
   * The user's main address.
   */
  address_main?: IAddress;
  /**
   * The user's postal address.
   */
  address_postal?: IAddress;
  /**
   * The public UUID of the user's avatar.
   */
  avatar_uuid: string;
  /**
   * The user's social security number.
   */
  social_security_number?: string;
  /**
   * The user's tax residence numbers for different countries.
   */
  tax_resident?: Array<ITaxResident>;
  /**
   * The type of identification document the user registered with.
   */
  document_type?: string;
  /**
   * The identification document number the user registered with.
   */
  document_number?: string;
  /**
   * The country which issued the identification document the user registered with.
   */
  document_country_of_issuance?: string;
  /**
   * The reference to the uploaded picture/scan of the front side of the identification document.
   */
  document_front_attachment_id?: number;
  /**
   * The reference to the uploaded picture/scan of the back side of the identification document.
   */
  document_back_attachment_id?: number;
  /**
   * The user's date of birth. Accepts ISO8601 date formats.
   */
  date_of_birth?: string;
  /**
   * The user's place of birth.
   */
  place_of_birth?: string;
  /**
   * The user's country of birth. Formatted as a SO 3166-1 alpha-2 country code.
   */
  country_of_birth?: string;
  /**
   * The user's nationality. Formatted as a SO 3166-1 alpha-2 country code.
   */
  nationality?: string;
  /**
   * The user's preferred language. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, seperated by an underscore.
   */
  language?: string;
  /**
   * The user's preferred region. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, seperated by an underscore.
   */
  region?: string;
  /**
   * The user's gender. Can be MALE, FEMALE or UNKNOWN.
   */
  gender?: string;
  /**
   * The user status. The user status. Can be: ACTIVE, BLOCKED, SIGNUP, DENIED or ABORTED.
   */
  status?: string;
  /**
   * The user sub-status. Can be: NONE, FACE_RESET, APPROVAL, APPROVAL_PARENT, AWAITING_PARENT, APPROVAL_SUPPORT, COUNTER_IBAN, IDEAL or SUBMIT.
   */
  sub_status?: string;
  /**
   * The legal guardian of the user. Required for minors.
   */
  legal_guardian_alias?: IPointer;
  /**
   * The setting for the session timeout of the user in seconds.
   */
  session_timeout?: number;
  /**
   * The amount the user can pay in the session without asking for credentials.
   */
  daily_limit_without_confirmation_login?: IAmount;
  /**
   * The id of the user.
   */
  readonly id?: number;
  /**
   * The timestamp of the user object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the user object's last update.
   */
  readonly updated?: string;
  /**
   * The user's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The user's legal name.
   */
  readonly legal_name?: string;
  /**
   * The display name for the user.
   */
  readonly display_name?: string;
  /**
   * The aliases of the user.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The user's avatar.
   */
  readonly avatar?: IAvatar;
  /**
   * The version of the terms of service accepted by the user.
   */
  readonly version_terms_of_service?: string;
  /**
   * The types of notifications that will result in a push notification or URL callback for this UserLight.
   */
  readonly notification_filters?: Array<INotificationFilter>;
  /**
   * The user deny reason.
   */
  readonly deny_reason?: string;
}

export interface IUserLegalNameListing {
  /**
   * All legal names that can be used by the user
   */
  readonly legal_names?: Array<string>;
}

export interface IUserCredentialPasswordIpRead {
  /**
   * The id of the credential.
   */
  readonly id?: number;
  /**
   * The timestamp of the credential object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the credential object's last update.
   */
  readonly updated?: string;
  /**
   * The status of the credential.
   */
  readonly status?: string;
  /**
   * When the status is PENDING_FIRST_USE: when the credential expires.
   */
  readonly expiry_time?: string;
  /**
   * When the status is PENDING_FIRST_USE: the value of the token.
   */
  readonly token_value?: string;
  /**
   * When the status is ACTIVE: the details of the device that may use the credential.
   */
  readonly permitted_device?: IPermittedDevice;
}

export interface IUserCredentialPasswordIpListing {
  /**
   * The id of the credential.
   */
  readonly id?: number;
  /**
   * The timestamp of the credential object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the credential object's last update.
   */
  readonly updated?: string;
  /**
   * The status of the credential.
   */
  readonly status?: string;
  /**
   * When the status is PENDING_FIRST_USE: when the credential expires.
   */
  readonly expiry_time?: string;
  /**
   * When the status is PENDING_FIRST_USE: the value of the token.
   */
  readonly token_value?: string;
  /**
   * When the status is ACTIVE: the details of the device that may use the credential.
   */
  readonly permitted_device?: IPermittedDevice;
}

export interface IUserCompanyUpdate {
  /**
   * The id of the modified company.
   */
  readonly id?: number;
}

export interface IUserCompanyRead {
  /**
   * The id of the modified company.
   */
  readonly id?: number;
  /**
   * The timestamp of the company object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the company object's last update.
   */
  readonly updated?: string;
  /**
   * The company's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The company name.
   */
  readonly name?: string;
  /**
   * The company's display name.
   */
  readonly display_name?: string;
  /**
   * The company's public nick name.
   */
  readonly public_nick_name?: string;
  /**
   * The aliases of the account.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The company's chamber of commerce number.
   */
  readonly chamber_of_commerce_number?: string;
  /**
   * The company's legal form.
   */
  readonly legal_form?: string;
  /**
   * The type of business entity.
   */
  readonly type_of_business_entity?: string;
  /**
   * The sector of industry.
   */
  readonly sector_of_industry?: string;
  /**
   * The company's other bank account IBAN, through which we verify it.
   */
  readonly counter_bank_iban?: string;
  /**
   * The company's avatar.
   */
  readonly avatar?: IAvatar;
  /**
   * The company's main address.
   */
  readonly address_main?: IAddress;
  /**
   * The company's postal address.
   */
  readonly address_postal?: IAddress;
  /**
   * The version of the terms of service accepted by the user.
   */
  readonly version_terms_of_service?: string;
  /**
   * The existing bunq user alias for the company's director.
   */
  readonly director_alias?: ILabelUser;
  /**
   * The person's preferred language. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, seperated by an underscore.
   */
  readonly language?: string;
  /**
   * The country as an ISO 3166-1 alpha-2 country code..
   */
  readonly country?: string;
  /**
   * The person's preferred region. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, seperated by an underscore.
   */
  readonly region?: string;
  /**
   * The names of the company's ultimate beneficiary owners. Minimum zero, maximum four.
   */
  readonly ubo?: Array<IUbo>;
  /**
   * The user status. Can be: ACTIVE, SIGNUP, RECOVERY.
   */
  readonly status?: string;
  /**
   * The user sub-status. Can be: NONE, FACE_RESET, APPROVAL, APPROVAL_DIRECTOR, APPROVAL_PARENT, APPROVAL_SUPPORT, COUNTER_IBAN, IDEAL or SUBMIT.
   */
  readonly sub_status?: string;
  /**
   * The setting for the session timeout of the company in seconds.
   */
  readonly session_timeout?: number;
  /**
   * The amount the company can pay in the session without asking for credentials.
   */
  readonly daily_limit_without_confirmation_login?: IAmount;
  /**
   * The types of notifications that will result in a push notification or URL callback for this UserCompany.
   */
  readonly notification_filters?: Array<INotificationFilter>;
  /**
   * The customer profile of the company.
   */
  readonly customer?: ICustomer;
  /**
   * The customer limits of the company.
   */
  readonly customer_limit?: ICustomerLimit;
  /**
   * The subscription of the company.
   */
  readonly billing_contract?: Array<IBillingContractSubscription>;
  /**
   * The user deny reason.
   */
  readonly deny_reason?: string;
}

export interface IUserCompanyNameListing {
  /**
   * All known (trade) names for a user company.
   */
  readonly name_array?: Array<string>;
}

export interface IUserCompany {
  /**
   * The company name.
   */
  name?: string;
  /**
   * The company's public nick name.
   */
  public_nick_name?: string;
  /**
   * The public UUID of the company's avatar.
   */
  avatar_uuid?: string;
  /**
   * The company's main address.
   */
  address_main?: IAddress;
  /**
   * The company's postal address.
   */
  address_postal?: IAddress;
  /**
   * The person's preferred language. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, seperated by an underscore.
   */
  language?: string;
  /**
   * The person's preferred region. Formatted as a ISO 639-1 language code plus a ISO 3166-1 alpha-2 country code, seperated by an underscore.
   */
  region?: string;
  /**
   * The country as an ISO 3166-1 alpha-2 country code..
   */
  country?: string;
  /**
   * The names of the company's ultimate beneficiary owners. Minimum zero, maximum four.
   */
  ubo?: Array<IUbo>;
  /**
   * The company's chamber of commerce number.
   */
  chamber_of_commerce_number?: string;
  /**
   * The company's legal form.
   */
  legal_form?: string;
  /**
   * The user status. Can be: ACTIVE, SIGNUP, RECOVERY.
   */
  status?: string;
  /**
   * The user sub-status. Can be: NONE, FACE_RESET, APPROVAL, APPROVAL_DIRECTOR, APPROVAL_PARENT, APPROVAL_SUPPORT, COUNTER_IBAN, IDEAL or SUBMIT.
   */
  sub_status?: string;
  /**
   * The setting for the session timeout of the company in seconds.
   */
  session_timeout?: number;
  /**
   * The amount the company can pay in the session without asking for credentials.
   */
  daily_limit_without_confirmation_login?: IAmount;
  /**
   * The id of the modified company.
   */
  readonly id?: number;
  /**
   * The timestamp of the company object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the company object's last update.
   */
  readonly updated?: string;
  /**
   * The company's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The company's display name.
   */
  readonly display_name?: string;
  /**
   * The aliases of the account.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The type of business entity.
   */
  readonly type_of_business_entity?: string;
  /**
   * The sector of industry.
   */
  readonly sector_of_industry?: string;
  /**
   * The company's other bank account IBAN, through which we verify it.
   */
  readonly counter_bank_iban?: string;
  /**
   * The company's avatar.
   */
  readonly avatar?: IAvatar;
  /**
   * The version of the terms of service accepted by the user.
   */
  readonly version_terms_of_service?: string;
  /**
   * The existing bunq user alias for the company's director.
   */
  readonly director_alias?: ILabelUser;
  /**
   * The types of notifications that will result in a push notification or URL callback for this UserCompany.
   */
  readonly notification_filters?: Array<INotificationFilter>;
  /**
   * The customer profile of the company.
   */
  readonly customer?: ICustomer;
  /**
   * The customer limits of the company.
   */
  readonly customer_limit?: ICustomerLimit;
  /**
   * The subscription of the company.
   */
  readonly billing_contract?: Array<IBillingContractSubscription>;
  /**
   * The user deny reason.
   */
  readonly deny_reason?: string;
}

export interface IUserApiKeyAnchoredUser {
  /**
   *
   */
  readonly UserPerson?: IUserPerson;
  /**
   *
   */
  readonly UserCompany?: IUserCompany;
  /**
   *
   */
  readonly UserPaymentServiceProvider?: IUserPaymentServiceProvider;
}

export interface IUserApiKey {
  /**
   * The id of the user.
   */
  readonly id?: number;
  /**
   * The timestamp of the user object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the user object's last update.
   */
  readonly updated?: string;
  /**
   * The user who requested access.
   */
  readonly requested_by_user?: IUserApiKeyAnchoredUser;
  /**
   * The user who granted access.
   */
  readonly granted_by_user?: IUserApiKeyAnchoredUser;
}

export interface IUbo {
  /**
   * The name of the ultimate beneficiary owner.
   */
  name?: string;
  /**
   * The date of birth of the ultimate beneficiary owner.
   */
  date_of_birth?: string;
  /**
   * The nationality of the ultimate beneficiary owner.
   */
  nationality?: string;
}

export interface ITreeProgressListing {
  /**
   * The number of trees this user and all users have planted.
   */
  readonly number_of_tree?: number;
  /**
   * The progress towards the next tree.
   */
  readonly progress_tree_next?: number;
}

export interface ITransferwiseTransfer {
  /**
   * The id of the monetary account the payment should be made from.
   */
  monetary_account_id: string;
  /**
   * The id of the target account.
   */
  recipient_id: string;
  /**
   * The LabelMonetaryAccount containing the public information of 'this' (party) side of the Payment.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The LabelMonetaryAccount containing the public information of the other (counterparty) side of the Payment.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The status.
   */
  readonly status?: string;
  /**
   * The subStatus.
   */
  readonly sub_status?: string;
  /**
   * The status as Transferwise reports it.
   */
  readonly status_transferwise?: string;
  /**
   * A status to indicatie if Transferwise has an issue with this payment and requires more information.
   */
  readonly status_transferwise_issue?: string;
  /**
   * The source amount.
   */
  readonly amount_source?: IAmount;
  /**
   * The target amount.
   */
  readonly amount_target?: IAmount;
  /**
   * The rate of the payment.
   */
  readonly rate?: string;
  /**
   * The reference of the payment.
   */
  readonly reference?: string;
  /**
   * The Pay-In reference of the payment.
   */
  readonly pay_in_reference?: string;
  /**
   * The estimated delivery time.
   */
  readonly time_delivery_estimate?: string;
  /**
   * The quote details used to created the payment.
   */
  readonly quote?: ITransferwiseQuote;
}

export interface ITransferwiseQuote {
  /**
   * The source currency.
   */
  currency_source: string;
  /**
   * The target currency.
   */
  currency_target: string;
  /**
   * The source amount.
   */
  amount_source?: IAmount;
  /**
   * The target amount.
   */
  amount_target?: IAmount;
  /**
   * The id of the quote.
   */
  readonly id?: number;
  /**
   * The timestamp of the quote's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the quote's last update.
   */
  readonly updated?: string;
  /**
   * The expiration timestamp of the quote.
   */
  readonly time_expiry?: string;
  /**
   * The quote id Transferwise needs.
   */
  readonly quote_id?: string;
  /**
   * The fee amount.
   */
  readonly amount_fee?: IAmount;
  /**
   * The rate.
   */
  readonly rate?: string;
  /**
   * The estimated delivery time.
   */
  readonly time_delivery_estimate?: string;
}

export interface ITokenQrRequestSofortCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ITokenQrRequestSofort {
  /**
   * The token passed from a site or read from a QR code.
   */
  token: string;
}

export interface ITokenQrRequestIdealCreate {
  /**
   * The id of the RequestResponse.
   */
  readonly id?: number;
  /**
   * The timestamp of when the RequestResponse was responded to.
   */
  readonly time_responded?: string;
  /**
   * The timestamp of when the RequestResponse expired or will expire.
   */
  readonly time_expiry?: string;
  /**
   * The id of the MonetaryAccount the RequestResponse was received on.
   */
  readonly monetary_account_id?: number;
  /**
   * The requested Amount.
   */
  readonly amount_inquired?: IAmount;
  /**
   * The Amount the RequestResponse was accepted with.
   */
  readonly amount_responded?: IAmount;
  /**
   * The LabelMonetaryAccount with the public information of the MonetaryAccount this RequestResponse was received on.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The LabelMonetaryAccount with the public information of the MonetaryAccount that is requesting money with this RequestResponse.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The description for the RequestResponse provided by the requesting party. Maximum 9000 characters.
   */
  readonly description?: string;
  /**
   * The Attachments attached to the RequestResponse.
   */
  readonly attachment?: Array<IAttachment>;
  /**
   * The status of the created RequestResponse. Can only be PENDING.
   */
  readonly status?: string;
  /**
   * The minimum age the user accepting the RequestResponse must have.
   */
  readonly minimum_age?: number;
  /**
   * Whether or not an address must be provided on accept.
   */
  readonly require_address?: string;
  /**
   * The shipping address provided by the accepting user if an address was requested.
   */
  readonly address_shipping?: IAddress;
  /**
   * The billing address provided by the accepting user if an address was requested.
   */
  readonly address_billing?: IAddress;
  /**
   * The Geolocation where the RequestResponse was created.
   */
  readonly geolocation?: IGeolocation;
  /**
   * The URL which the user is sent to after accepting or rejecting the Request.
   */
  readonly redirect_url?: string;
  /**
   * The type of the RequestResponse. Can be only be IDEAL.
   */
  readonly type?: string;
  /**
   * The subtype of the RequestResponse. Can be only be NONE.
   */
  readonly sub_type?: string;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The whitelist id for this action or null.
   */
  readonly eligible_whitelist_id?: number;
}

export interface ITokenQrRequestIdeal {
  /**
   * The token passed from a site or read from a QR code.
   */
  token: string;
}

export interface ITaxResident {
  /**
   * The country of the tax number.
   */
  country?: string;
  /**
   * The tax number.
   */
  tax_number?: string;
  /**
   * The status of the tax number. Either CONFIRMED or UNCONFIRMED.
   */
  status?: string;
}

export interface ITabVisibility {
  /**
   * When true the tab will be linked to the ACTIVE cash registers QR code.
   */
  cash_register_qr_code?: boolean;
  /**
   * When true the tab will be visible through its own QR code. Use ../tab/{tab-id}/qr-code-content to get the raw content of this QR code
   */
  tab_qr_code?: boolean;
  /**
   * The location of the Tab in NearPay.
   */
  location?: IGeolocation;
}

export interface ITabUsageSingleUpdate {
  /**
   * The uuid of the modified TabUsageSingle.
   */
  readonly uuid?: string;
}

export interface ITabUsageSingleRead {
  /**
   * The uuid of the created TabUsageSingle.
   */
  readonly uuid?: string;
  /**
   * The timestamp of the Tab's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the Tab's last update.
   */
  readonly updated?: string;
  /**
   * The merchant reference of the Tab, as defined by the owner.
   */
  readonly merchant_reference?: string;
  /**
   * The description of the TabUsageMultiple. Maximum 9000 characters.
   */
  readonly description?: string;
  /**
   * The status of the Tab. Can be OPEN, WAITING_FOR_PAYMENT, PAID or CANCELED.
   */
  readonly status?: string;
  /**
   * The total amount of the Tab.
   */
  readonly amount_total?: IAmount;
  /**
   * The amount that has been paid for this Tab.
   */
  readonly amount_paid?: IAmount;
  /**
   * The token used to redirect mobile devices directly to the bunq app. Because they can't scan a QR code.
   */
  readonly qr_code_token?: string;
  /**
   * The URL redirecting user to the tab payment in the bunq app. Only works on mobile devices.
   */
  readonly tab_url?: string;
  /**
   * The visibility of a Tab. A Tab can be visible trough NearPay, the QR code of the CashRegister and its own QR code.
   */
  readonly visibility?: ITabVisibility;
  /**
   * The minimum age of the user paying the Tab.
   */
  readonly minimum_age?: boolean;
  /**
   * Whether or not an billing and shipping address must be provided when paying the Tab.
   */
  readonly require_address?: string;
  /**
   * The URL which the user is sent to after paying the Tab.
   */
  readonly redirect_url?: string;
  /**
   * The moment when this Tab expires.
   */
  readonly expiration?: string;
  /**
   * The alias of the party that owns this tab.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The location of the cash register that created this tab.
   */
  readonly cash_register_location?: IGeolocation;
  /**
   * The tab items of this tab.
   */
  readonly tab_item?: Array<ITabItem>;
  /**
   * An array of attachments that describe the tab. Uploaded through the POST /user/{userid}/attachment-tab endpoint.
   */
  readonly tab_attachment?: Array<BunqId>;
}

export interface ITabUsageSingleListing {
  /**
   * The uuid of the created TabUsageSingle.
   */
  readonly uuid?: string;
  /**
   * The timestamp of the Tab's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the Tab's last update.
   */
  readonly updated?: string;
  /**
   * The merchant reference of the Tab, as defined by the owner.
   */
  readonly merchant_reference?: string;
  /**
   * The description of the TabUsageMultiple. Maximum 9000 characters.
   */
  readonly description?: string;
  /**
   * The status of the Tab. Can be OPEN, WAITING_FOR_PAYMENT, PAID or CANCELED.
   */
  readonly status?: string;
  /**
   * The total amount of the Tab.
   */
  readonly amount_total?: IAmount;
  /**
   * The amount that has been paid for this Tab.
   */
  readonly amount_paid?: IAmount;
  /**
   * The token used to redirect mobile devices directly to the bunq app. Because they can't scan a QR code.
   */
  readonly qr_code_token?: string;
  /**
   * The URL redirecting user to the tab payment in the bunq app. Only works on mobile devices.
   */
  readonly tab_url?: string;
  /**
   * The visibility of a Tab. A Tab can be visible trough NearPay, the QR code of the CashRegister and its own QR code.
   */
  readonly visibility?: ITabVisibility;
  /**
   * The minimum age of the user paying the Tab.
   */
  readonly minimum_age?: boolean;
  /**
   * Whether or not an billing and shipping address must be provided when paying the Tab.
   */
  readonly require_address?: string;
  /**
   * The URL which the user is sent to after paying the Tab.
   */
  readonly redirect_url?: string;
  /**
   * The moment when this Tab expires.
   */
  readonly expiration?: string;
  /**
   * The alias of the party that owns this tab.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The location of the cash register that created this tab.
   */
  readonly cash_register_location?: IGeolocation;
  /**
   * The tab items of this tab.
   */
  readonly tab_item?: Array<ITabItem>;
  /**
   * An array of attachments that describe the tab. Uploaded through the POST /user/{userid}/attachment-tab endpoint.
   */
  readonly tab_attachment?: Array<BunqId>;
}

export interface ITabUsageSingleDelete {}

export interface ITabUsageSingleCreate {
  /**
   * The uuid of the created TabUsageSingle.
   */
  readonly uuid?: string;
}

export interface ITabUsageSingle {
  /**
   * The merchant reference of the Tab, as defined by the owner.
   */
  merchant_reference?: string;
  /**
   * The description of the TabUsageMultiple. Maximum 9000 characters.
   */
  description?: string;
  /**
   * The status of the Tab. Can be OPEN, WAITING_FOR_PAYMENT, PAID or CANCELED.
   */
  status?: string;
  /**
   * The total amount of the Tab.
   */
  amount_total?: IAmount;
  /**
   * [DEPRECATED] Whether or not a higher amount can be paid.
   */
  allow_amount_higher?: boolean;
  /**
   * [DEPRECATED] Whether or not a lower amount can be paid.
   */
  allow_amount_lower?: boolean;
  /**
   * [DEPRECATED] Whether or not the user paying the Tab should be asked if he wants to give a tip. When want_tip is set to true, allow_amount_higher must also be set to true and allow_amount_lower must be false.
   */
  want_tip?: boolean;
  /**
   * The minimum age of the user paying the Tab.
   */
  minimum_age?: boolean;
  /**
   * Whether or not an billing and shipping address must be provided when paying the Tab.
   */
  require_address?: string;
  /**
   * The URL which the user is sent to after paying the Tab.
   */
  redirect_url?: string;
  /**
   * The visibility of a Tab. A Tab can be visible trough NearPay, the QR code of the CashRegister and its own QR code.
   */
  visibility?: ITabVisibility;
  /**
   * The moment when this Tab expires.
   */
  expiration?: string;
  /**
   * An array of attachments that describe the tab. Uploaded through the POST /user/{userid}/attachment-tab endpoint.
   */
  tab_attachment?: Array<BunqId>;
  /**
   * The uuid of the created TabUsageSingle.
   */
  readonly uuid?: string;
  /**
   * The timestamp of the Tab's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the Tab's last update.
   */
  readonly updated?: string;
  /**
   * The amount that has been paid for this Tab.
   */
  readonly amount_paid?: IAmount;
  /**
   * The token used to redirect mobile devices directly to the bunq app. Because they can't scan a QR code.
   */
  readonly qr_code_token?: string;
  /**
   * The URL redirecting user to the tab payment in the bunq app. Only works on mobile devices.
   */
  readonly tab_url?: string;
  /**
   * The alias of the party that owns this tab.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The location of the cash register that created this tab.
   */
  readonly cash_register_location?: IGeolocation;
  /**
   * The tab items of this tab.
   */
  readonly tab_item?: Array<ITabItem>;
}

export interface ITabUsageMultipleUpdate {
  /**
   * The uuid of the modified TabUsageMultiple.
   */
  readonly uuid?: string;
}

export interface ITabUsageMultipleRead {
  /**
   * The uuid of the created TabUsageMultiple.
   */
  readonly uuid?: string;
  /**
   * The timestamp of the Tab's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the Tab's last update.
   */
  readonly updated?: string;
  /**
   * The description of the TabUsageMultiple. Maximum 9000 characters.
   */
  readonly description?: string;
  /**
   * The status of the Tab. Can be OPEN, PAYABLE or CLOSED.
   */
  readonly status?: string;
  /**
   * The total amount of the Tab.
   */
  readonly amount_total?: IAmount;
  /**
   * The token used to redirect mobile devices directly to the bunq app. Because they can't scan a QR code.
   */
  readonly qr_code_token?: string;
  /**
   * The URL redirecting user to the tab payment in the bunq app. Only works on mobile devices.
   */
  readonly tab_url?: string;
  /**
   * The visibility of a Tab. A Tab can be visible trough NearPay, the QR code of the CashRegister and its own QR code.
   */
  readonly visibility?: ITabVisibility;
  /**
   * The minimum age of the user paying the Tab.
   */
  readonly minimum_age?: boolean;
  /**
   * Whether or not an billing and shipping address must be provided when paying the Tab.
   */
  readonly require_address?: string;
  /**
   * The URL which the user is sent to after paying the Tab.
   */
  readonly redirect_url?: string;
  /**
   * The moment when this Tab expires.
   */
  readonly expiration?: string;
  /**
   * The alias of the party that owns this tab.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The location of the cash register that created this tab.
   */
  readonly cash_register_location?: IGeolocation;
  /**
   * The tab items of this tab.
   */
  readonly tab_item?: Array<ITabItem>;
  /**
   * An array of attachments that describe the tab. Viewable through the GET /tab/{tabid}/attachment/{attachmentid}/content endpoint.
   */
  readonly tab_attachment?: Array<BunqId>;
}

export interface ITabUsageMultipleListing {
  /**
   * The uuid of the created TabUsageMultiple.
   */
  readonly uuid?: string;
  /**
   * The timestamp of the Tab's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the Tab's last update.
   */
  readonly updated?: string;
  /**
   * The description of the TabUsageMultiple. Maximum 9000 characters.
   */
  readonly description?: string;
  /**
   * The status of the Tab. Can be OPEN, PAYABLE or CLOSED.
   */
  readonly status?: string;
  /**
   * The total amount of the Tab.
   */
  readonly amount_total?: IAmount;
  /**
   * The token used to redirect mobile devices directly to the bunq app. Because they can't scan a QR code.
   */
  readonly qr_code_token?: string;
  /**
   * The URL redirecting user to the tab payment in the bunq app. Only works on mobile devices.
   */
  readonly tab_url?: string;
  /**
   * The visibility of a Tab. A Tab can be visible trough NearPay, the QR code of the CashRegister and its own QR code.
   */
  readonly visibility?: ITabVisibility;
  /**
   * The minimum age of the user paying the Tab.
   */
  readonly minimum_age?: boolean;
  /**
   * Whether or not an billing and shipping address must be provided when paying the Tab.
   */
  readonly require_address?: string;
  /**
   * The URL which the user is sent to after paying the Tab.
   */
  readonly redirect_url?: string;
  /**
   * The moment when this Tab expires.
   */
  readonly expiration?: string;
  /**
   * The alias of the party that owns this tab.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The location of the cash register that created this tab.
   */
  readonly cash_register_location?: IGeolocation;
  /**
   * The tab items of this tab.
   */
  readonly tab_item?: Array<ITabItem>;
  /**
   * An array of attachments that describe the tab. Viewable through the GET /tab/{tabid}/attachment/{attachmentid}/content endpoint.
   */
  readonly tab_attachment?: Array<BunqId>;
}

export interface ITabUsageMultipleDelete {}

export interface ITabUsageMultipleCreate {
  /**
   * The uuid of the created TabUsageMultiple.
   */
  readonly uuid?: string;
}

export interface ITabUsageMultiple {
  /**
   * The description of the TabUsageMultiple. Maximum 9000 characters.
   */
  description?: string;
  /**
   * The status of the Tab. Can be OPEN, PAYABLE or CLOSED.
   */
  status?: string;
  /**
   * The total amount of the Tab.
   */
  amount_total?: IAmount;
  /**
   * [DEPRECATED] Whether or not a higher amount can be paid.
   */
  allow_amount_higher?: boolean;
  /**
   * [DEPRECATED] Whether or not a lower amount can be paid.
   */
  allow_amount_lower?: boolean;
  /**
   * [DEPRECATED] Whether or not the user paying the Tab should be asked if he wants to give a tip. When want_tip is set to true, allow_amount_higher must also be set to true and allow_amount_lower must be false.
   */
  want_tip?: boolean;
  /**
   * The minimum age of the user paying the Tab.
   */
  minimum_age?: boolean;
  /**
   * Whether or not an billing and shipping address must be provided when paying the Tab.
   */
  require_address?: string;
  /**
   * The URL which the user is sent to after paying the Tab.
   */
  redirect_url?: string;
  /**
   * The visibility of a Tab. A Tab can be visible trough NearPay, the QR code of the CashRegister and its own QR code.
   */
  visibility?: ITabVisibility;
  /**
   * The moment when this Tab expires.
   */
  expiration?: string;
  /**
   * An array of attachments that describe the tab. Viewable through the GET /tab/{tabid}/attachment/{attachmentid}/content endpoint.
   */
  tab_attachment?: Array<BunqId>;
  /**
   * The uuid of the created TabUsageMultiple.
   */
  readonly uuid?: string;
  /**
   * The timestamp of the Tab's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the Tab's last update.
   */
  readonly updated?: string;
  /**
   * The token used to redirect mobile devices directly to the bunq app. Because they can't scan a QR code.
   */
  readonly qr_code_token?: string;
  /**
   * The URL redirecting user to the tab payment in the bunq app. Only works on mobile devices.
   */
  readonly tab_url?: string;
  /**
   * The alias of the party that owns this tab.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The location of the cash register that created this tab.
   */
  readonly cash_register_location?: IGeolocation;
  /**
   * The tab items of this tab.
   */
  readonly tab_item?: Array<ITabItem>;
}

export interface ITabTextWaitingScreen {
  /**
   * Language of tab text
   */
  language?: string;
  /**
   * Tab text
   */
  description?: string;
}

export interface ITabResultResponseRead {
  /**
   * The Tab details.
   */
  readonly tab?: ITab;
  /**
   * The payment made for the Tab.
   */
  readonly payment?: IPayment;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface ITabResultResponseListing {
  /**
   * The Tab details.
   */
  readonly tab?: ITab;
  /**
   * The payment made for the Tab.
   */
  readonly payment?: IPayment;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface ITabResultResponse {
  /**
   * The Tab details.
   */
  readonly tab?: ITab;
  /**
   * The payment made for the Tab.
   */
  readonly payment?: IPayment;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface ITabResultInquiryRead {
  /**
   * The Tab details.
   */
  readonly tab?: ITab;
  /**
   * The payment made for the Tab.
   */
  readonly payment?: IPayment;
}

export interface ITabResultInquiryListing {
  /**
   * The Tab details.
   */
  readonly tab?: ITab;
  /**
   * The payment made for the Tab.
   */
  readonly payment?: IPayment;
}

export interface ITabResultInquiry {
  /**
   * The Tab details.
   */
  readonly tab?: ITab;
  /**
   * The payment made for the Tab.
   */
  readonly payment?: IPayment;
}

export interface ITabRead {
  /**
   *
   */
  readonly TabUsageSingle?: ITabUsageSingle;
  /**
   *
   */
  readonly TabUsageMultiple?: ITabUsageMultiple;
}

export interface ITabQrCodeContentListing {}

export interface ITabListing {
  /**
   *
   */
  readonly TabUsageSingle?: ITabUsageSingle;
  /**
   *
   */
  readonly TabUsageMultiple?: ITabUsageMultiple;
}

export interface ITabItemShopUpdate {
  /**
   * The id of the modified TabItem.
   */
  readonly id?: number;
}

export interface ITabItemShopRead {
  /**
   * The id of the created TabItem.
   */
  readonly id?: number;
  /**
   * The TabItem's brief description.
   */
  readonly description?: string;
  /**
   * The TabItem's EAN code.
   */
  readonly ean_code?: string;
  /**
   * A struct with an AttachmentPublic UUID that used as an avatar for the TabItem.
   */
  readonly avatar_attachment?: IAttachmentPublic;
  /**
   * A list of AttachmentTab attached to the TabItem.
   */
  readonly tab_attachment?: Array<IAttachmentTab>;
  /**
   * The quantity of the TabItem.
   */
  readonly quantity?: number;
  /**
   * The money amount of the TabItem.
   */
  readonly amount?: IAmount;
}

export interface ITabItemShopListing {
  /**
   * The id of the created TabItem.
   */
  readonly id?: number;
  /**
   * The TabItem's brief description.
   */
  readonly description?: string;
  /**
   * The TabItem's EAN code.
   */
  readonly ean_code?: string;
  /**
   * A struct with an AttachmentPublic UUID that used as an avatar for the TabItem.
   */
  readonly avatar_attachment?: IAttachmentPublic;
  /**
   * A list of AttachmentTab attached to the TabItem.
   */
  readonly tab_attachment?: Array<IAttachmentTab>;
  /**
   * The quantity of the TabItem.
   */
  readonly quantity?: number;
  /**
   * The money amount of the TabItem.
   */
  readonly amount?: IAmount;
}

export interface ITabItemShopDelete {}

export interface ITabItemShopCreate {
  /**
   * The id of the created TabItem.
   */
  readonly id?: number;
}

export interface ITabItemShopBatchCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ITabItemShopBatch {
  /**
   * The list of tab items we want to create in a single batch. Limited to 50 items per batch.
   */
  tab_items: Array<ITabItemShop>;
}

export interface ITabItemShop {
  /**
   * The TabItem's brief description.
   */
  description?: string;
  /**
   * The TabItem's EAN code.
   */
  ean_code?: string;
  /**
   * An AttachmentPublic UUID that used as an avatar for the TabItem.
   */
  avatar_attachment_uuid?: string;
  /**
   * A list of AttachmentTab attached to the TabItem.
   */
  tab_attachment?: Array<IAttachmentTab>;
  /**
   * The quantity of the TabItem.
   */
  quantity?: number;
  /**
   * The money amount of the TabItem.
   */
  amount?: IAmount;
  /**
   * The id of the created TabItem.
   */
  readonly id?: number;
  /**
   * A struct with an AttachmentPublic UUID that used as an avatar for the TabItem.
   */
  readonly avatar_attachment?: IAttachmentPublic;
}

export interface ITabItem {
  /**
   * The id of the tab item.
   */
  readonly id?: number;
  /**
   * The item's brief description.
   */
  readonly description?: string;
  /**
   * The item's EAN code.
   */
  readonly ean_code?: string;
  /**
   * A struct with an AttachmentPublic UUID that used as an avatar for the TabItem.
   */
  readonly avatar_attachment?: IAttachmentPublic;
  /**
   * A list of AttachmentTab attached to the TabItem.
   */
  readonly tab_attachment?: Array<IAttachmentTab>;
  /**
   * The quantity of the item. Formatted as a number containing up to 15 digits, up to 15 decimals and using a dot.
   */
  readonly quantity?: string;
  /**
   * The money amount of the item.
   */
  readonly amount?: IAmount;
}

export interface ITabAttachmentTabRead {
  /**
   * The id of the attachment.
   */
  readonly id?: number;
  /**
   * The timestamp of the attachment's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the attachment's last update.
   */
  readonly updated?: string;
  /**
   * The attachment.
   */
  readonly attachment?: IAttachment;
}

export interface ITabAttachmentTabContentListing {}

export interface ITab {
  /**
   *
   */
  readonly TabUsageSingle?: ITabUsageSingle;
  /**
   *
   */
  readonly TabUsageMultiple?: ITabUsageMultiple;
}

export interface ISofortMerchantTransactionRead {
  /**
   * The id of the monetary account this sofort merchant transaction links to.
   */
  readonly monetary_account_id?: number;
  /**
   * The alias of the monetary account to add money to.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The alias of the monetary account the money comes from.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * In case of a successful transaction, the amount of money that will be transferred.
   */
  readonly amount_guaranteed?: IAmount;
  /**
   * The requested amount of money to add.
   */
  readonly amount_requested?: IAmount;
  /**
   * The BIC of the issuer.
   */
  readonly issuer?: string;
  /**
   * The URL to visit to
   */
  readonly issuer_authentication_url?: string;
  /**
   * The status of the transaction.
   */
  readonly status?: string;
  /**
   * The error message of the transaction.
   */
  readonly error_message?: Array<Error>;
  /**
   * The 'transaction ID' of the Sofort transaction.
   */
  readonly transaction_identifier?: string;
}

export interface ISofortMerchantTransactionListing {
  /**
   * The id of the monetary account this sofort merchant transaction links to.
   */
  readonly monetary_account_id?: number;
  /**
   * The alias of the monetary account to add money to.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The alias of the monetary account the money comes from.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * In case of a successful transaction, the amount of money that will be transferred.
   */
  readonly amount_guaranteed?: IAmount;
  /**
   * The requested amount of money to add.
   */
  readonly amount_requested?: IAmount;
  /**
   * The BIC of the issuer.
   */
  readonly issuer?: string;
  /**
   * The URL to visit to
   */
  readonly issuer_authentication_url?: string;
  /**
   * The status of the transaction.
   */
  readonly status?: string;
  /**
   * The error message of the transaction.
   */
  readonly error_message?: Array<Error>;
  /**
   * The 'transaction ID' of the Sofort transaction.
   */
  readonly transaction_identifier?: string;
}

export interface ISofortMerchantTransaction {
  /**
   * The requested amount of money to add.
   */
  amount_requested?: IAmount;
  /**
   * The BIC of the issuer.
   */
  issuer?: string;
  /**
   * The id of the monetary account this sofort merchant transaction links to.
   */
  readonly monetary_account_id?: number;
  /**
   * The alias of the monetary account to add money to.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The alias of the monetary account the money comes from.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * In case of a successful transaction, the amount of money that will be transferred.
   */
  readonly amount_guaranteed?: IAmount;
  /**
   * The URL to visit to
   */
  readonly issuer_authentication_url?: string;
  /**
   * The status of the transaction.
   */
  readonly status?: string;
  /**
   * The error message of the transaction.
   */
  readonly error_message?: Array<Error>;
  /**
   * The 'transaction ID' of the Sofort transaction.
   */
  readonly transaction_identifier?: string;
}

export interface IShareInviteMonetaryAccountResponseUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IShareInviteMonetaryAccountResponseRead {
  /**
   * The id of the ShareInviteMonetaryAccountResponse.
   */
  readonly id?: number;
  /**
   * The timestamp of the ShareInviteMonetaryAccountResponse creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the ShareInviteMonetaryAccountResponse last update.
   */
  readonly updated?: string;
  /**
   * The monetary account and user who created the share.
   */
  readonly counter_alias?: ILabelMonetaryAccount;
  /**
   * The user who cancelled the share if it has been revoked or rejected.
   */
  readonly user_alias_cancelled?: ILabelUser;
  /**
   * The id of the monetary account the ACCEPTED share applies to. null otherwise.
   */
  readonly monetary_account_id?: number;
  /**
   * The id of the draft share invite bank.
   */
  readonly draft_share_invite_bank_id?: number;
  /**
   * The share details.
   */
  readonly share_detail?: IShareDetail;
  /**
   * The status of the share. Can be PENDING, REVOKED (the user deletes the share inquiry before it's accepted), ACCEPTED, CANCELLED (the user deletes an active share) or CANCELLATION_PENDING, CANCELLATION_ACCEPTED, CANCELLATION_REJECTED (for canceling mutual connects)
   */
  readonly status?: string;
  /**
   * The share type, either STANDARD or MUTUAL.
   */
  readonly share_type?: string;
  /**
   * The start date of this share.
   */
  readonly start_date?: string;
  /**
   * The expiration date of this share.
   */
  readonly end_date?: string;
  /**
   * The description of this share. It is basically the monetary account description.
   */
  readonly description?: string;
}

export interface IShareInviteMonetaryAccountResponseListing {
  /**
   * The id of the ShareInviteMonetaryAccountResponse.
   */
  readonly id?: number;
  /**
   * The timestamp of the ShareInviteMonetaryAccountResponse creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the ShareInviteMonetaryAccountResponse last update.
   */
  readonly updated?: string;
  /**
   * The monetary account and user who created the share.
   */
  readonly counter_alias?: ILabelMonetaryAccount;
  /**
   * The user who cancelled the share if it has been revoked or rejected.
   */
  readonly user_alias_cancelled?: ILabelUser;
  /**
   * The id of the monetary account the ACCEPTED share applies to. null otherwise.
   */
  readonly monetary_account_id?: number;
  /**
   * The id of the draft share invite bank.
   */
  readonly draft_share_invite_bank_id?: number;
  /**
   * The share details.
   */
  readonly share_detail?: IShareDetail;
  /**
   * The status of the share. Can be PENDING, REVOKED (the user deletes the share inquiry before it's accepted), ACCEPTED, CANCELLED (the user deletes an active share) or CANCELLATION_PENDING, CANCELLATION_ACCEPTED, CANCELLATION_REJECTED (for canceling mutual connects)
   */
  readonly status?: string;
  /**
   * The share type, either STANDARD or MUTUAL.
   */
  readonly share_type?: string;
  /**
   * The start date of this share.
   */
  readonly start_date?: string;
  /**
   * The expiration date of this share.
   */
  readonly end_date?: string;
  /**
   * The description of this share. It is basically the monetary account description.
   */
  readonly description?: string;
}

export interface IShareInviteMonetaryAccountResponse {
  /**
   * The status of the share. Can be PENDING, REVOKED (the user deletes the share inquiry before it's accepted), ACCEPTED, CANCELLED (the user deletes an active share) or CANCELLATION_PENDING, CANCELLATION_ACCEPTED, CANCELLATION_REJECTED (for canceling mutual connects)
   */
  status?: string;
  /**
   * The card to link to the shared monetary account. Used only if share_detail is ShareDetailCardPayment.
   */
  card_id?: number;
  /**
   * The id of the ShareInviteMonetaryAccountResponse.
   */
  readonly id?: number;
  /**
   * The timestamp of the ShareInviteMonetaryAccountResponse creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the ShareInviteMonetaryAccountResponse last update.
   */
  readonly updated?: string;
  /**
   * The monetary account and user who created the share.
   */
  readonly counter_alias?: ILabelMonetaryAccount;
  /**
   * The user who cancelled the share if it has been revoked or rejected.
   */
  readonly user_alias_cancelled?: ILabelUser;
  /**
   * The id of the monetary account the ACCEPTED share applies to. null otherwise.
   */
  readonly monetary_account_id?: number;
  /**
   * The id of the draft share invite bank.
   */
  readonly draft_share_invite_bank_id?: number;
  /**
   * The share details.
   */
  readonly share_detail?: IShareDetail;
  /**
   * The share type, either STANDARD or MUTUAL.
   */
  readonly share_type?: string;
  /**
   * The start date of this share.
   */
  readonly start_date?: string;
  /**
   * The expiration date of this share.
   */
  readonly end_date?: string;
  /**
   * The description of this share. It is basically the monetary account description.
   */
  readonly description?: string;
}

export interface IShareInviteMonetaryAccountInquiryUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IShareInviteMonetaryAccountInquiryRead {
  /**
   * The label of the monetary account that's being shared.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The user who created the share.
   */
  readonly user_alias_created?: ILabelUser;
  /**
   * The user who revoked the share.
   */
  readonly user_alias_revoked?: ILabelUser;
  /**
   * The label of the user to share with.
   */
  readonly counter_user_alias?: ILabelUser;
  /**
   * The id of the monetary account the share applies to.
   */
  readonly monetary_account_id?: number;
  /**
   * The id of the draft share invite bank.
   */
  readonly draft_share_invite_bank_id?: number;
  /**
   * The share details. Only one of these objects is returned.
   */
  readonly share_detail?: IShareDetail;
  /**
   * The status of the share. Can be PENDING, REVOKED (the user deletes the share inquiry before it's accepted), ACCEPTED, CANCELLED (the user deletes an active share) or CANCELLATION_PENDING, CANCELLATION_ACCEPTED, CANCELLATION_REJECTED (for canceling mutual connects)
   */
  readonly status?: string;
  /**
   * The share type, either STANDARD or MUTUAL.
   */
  readonly share_type?: string;
  /**
   * The start date of this share.
   */
  readonly start_date?: string;
  /**
   * The expiration date of this share.
   */
  readonly end_date?: string;
  /**
   * The id of the newly created share invite.
   */
  readonly id?: number;
}

export interface IShareInviteMonetaryAccountInquiryListing {
  /**
   * The label of the monetary account that's being shared.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The user who created the share.
   */
  readonly user_alias_created?: ILabelUser;
  /**
   * The user who revoked the share.
   */
  readonly user_alias_revoked?: ILabelUser;
  /**
   * The label of the user to share with.
   */
  readonly counter_user_alias?: ILabelUser;
  /**
   * The id of the monetary account the share applies to.
   */
  readonly monetary_account_id?: number;
  /**
   * The id of the draft share invite bank.
   */
  readonly draft_share_invite_bank_id?: number;
  /**
   * The share details. Only one of these objects is returned.
   */
  readonly share_detail?: IShareDetail;
  /**
   * The status of the share. Can be PENDING, REVOKED (the user deletes the share inquiry before it's accepted), ACCEPTED, CANCELLED (the user deletes an active share) or CANCELLATION_PENDING, CANCELLATION_ACCEPTED, CANCELLATION_REJECTED (for canceling mutual connects)
   */
  readonly status?: string;
  /**
   * The share type, either STANDARD or MUTUAL.
   */
  readonly share_type?: string;
  /**
   * The start date of this share.
   */
  readonly start_date?: string;
  /**
   * The expiration date of this share.
   */
  readonly end_date?: string;
  /**
   * The id of the newly created share invite.
   */
  readonly id?: number;
}

export interface IShareInviteMonetaryAccountInquiryCreate {
  /**
   * The id of the newly created share invite.
   */
  readonly id?: number;
}

export interface IShareInviteMonetaryAccountInquiryBatch {
  /**
   * The list of share invite bank inquiries that were made.
   */
  readonly share_invite_bank_inquiries?: Array<
    IShareInviteMonetaryAccountInquiry
  >;
  /**
   * The LabelMonetaryAccount containing the public information of this share invite inquiry batch.
   */
  readonly alias?: ILabelMonetaryAccount;
}

export interface IShareInviteMonetaryAccountInquiry {
  /**
   * The label of the user to share with.
   */
  counter_user_alias?: ILabelUser;
  /**
   * The id of the draft share invite bank.
   */
  draft_share_invite_bank_id?: number;
  /**
   * The share details. Only one of these objects is returned.
   */
  share_detail?: IShareDetail;
  /**
   * The status of the share. Can be PENDING, REVOKED (the user deletes the share inquiry before it's accepted), ACCEPTED, CANCELLED (the user deletes an active share) or CANCELLATION_PENDING, CANCELLATION_ACCEPTED, CANCELLATION_REJECTED (for canceling mutual connects)
   */
  status?: string;
  /**
   * The share type, either STANDARD or MUTUAL.
   */
  share_type?: string;
  /**
   * The start date of this share.
   */
  start_date?: string;
  /**
   * The expiration date of this share.
   */
  end_date?: string;
  /**
   * The label of the monetary account that's being shared.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The user who created the share.
   */
  readonly user_alias_created?: ILabelUser;
  /**
   * The user who revoked the share.
   */
  readonly user_alias_revoked?: ILabelUser;
  /**
   * The id of the monetary account the share applies to.
   */
  readonly monetary_account_id?: number;
  /**
   * The id of the newly created share invite.
   */
  readonly id?: number;
}

export interface IShareInviteMonetaryAccountAmountUsedDelete {}

export interface IShareDetailReadOnly {
  /**
   * If set to true, the invited user will be able to view the account balance.
   */
  view_balance?: boolean;
  /**
   * If set to true, the invited user will be able to view events from before the share was active.
   */
  view_old_events?: boolean;
  /**
   * If set to true, the invited user will be able to view events starting from the time the share became active.
   */
  view_new_events?: boolean;
}

export interface IShareDetailPayment {
  /**
   * If set to true, the invited user will be able to make payments from the shared account.
   */
  make_payments?: boolean;
  /**
   * If set to true, the invited user will be able to make draft payments from the shared account.
   */
  make_draft_payments?: boolean;
  /**
   * If set to true, the invited user will be able to view the account balance.
   */
  view_balance?: boolean;
  /**
   * If set to true, the invited user will be able to view events from before the share was active.
   */
  view_old_events?: boolean;
  /**
   * If set to true, the invited user will be able to view events starting from the time the share became active.
   */
  view_new_events?: boolean;
  /**
   * The budget restriction.
   */
  budget?: IBudgetRestriction;
}

export interface IShareDetailDraftPayment {
  /**
   * If set to true, the invited user will be able to make draft payments from the shared account.
   */
  make_draft_payments?: boolean;
  /**
   * If set to true, the invited user will be able to view the account balance.
   */
  view_balance?: boolean;
  /**
   * If set to true, the invited user will be able to view events from before the share was active.
   */
  view_old_events?: boolean;
  /**
   * If set to true, the invited user will be able to view events starting from the time the share became active.
   */
  view_new_events?: boolean;
}

export interface IShareDetail {
  /**
   * The share details for a payment share. In the response 'payment' is replaced by 'ShareDetailPayment'.
   */
  payment?: IShareDetailPayment;
  /**
   * The share details for viewing a share. In the response 'read_only' is replaced by 'ShareDetailReadOnly'.
   */
  read_only?: IShareDetailReadOnly;
  /**
   * The share details for a draft payment share. In the response 'draft_payment' is replaced by 'ShareDetailDraftPayment'.
   */
  draft_payment?: IShareDetailDraftPayment;
}

export interface ISessionServerToken {
  /**
   * The id of the Token.
   */
  readonly id?: number;
  /**
   * The Session token is the token the client has to provide in the "X-Bunq-Client-Authentication" header for each API call that requires a Session (only the creation of a Installation and DeviceServer don't require a Session).
   */
  readonly token?: string;
}

export interface ISessionServerCreate {
  /**
   * The Id object of the created Session.
   */
  readonly Id?: BunqId;
  /**
   * The token object of this Session.
   */
  readonly Token?: ISessionServerToken;
  /**
   * The UserCompany object that is logged in with this Session.
   */
  readonly UserCompany?: IUserCompany;
  /**
   * The UserPerson object that is logged in with this Session.
   */
  readonly UserPerson?: IUserPerson;
  /**
   * The UserApiKey object that is logged in with this Session.
   */
  readonly UserApiKey?: IUserApiKey;
  /**
   * The UserPaymentServiceProvider object that is logged in with this Session.
   */
  readonly UserPaymentServiceProvider?: IUserPaymentServiceProvider;
}

export interface ISessionServer {
  /**
   * The API key of the user you want to login. If your API key has not been used before, it will be bound to the ip address of this DeviceServer.
   */
  secret: string;
}

export interface ISessionDelete {}

export interface IScheduleUserListing {}

export interface IScheduleRead {
  /**
   * The schedule start time (UTC).
   */
  readonly time_start?: string;
  /**
   * The schedule end time (UTC).
   */
  readonly time_end?: string;
  /**
   * The schedule recurrence unit, options: ONCE, HOURLY, DAILY, WEEKLY, MONTHLY, YEARLY
   */
  readonly recurrence_unit?: string;
  /**
   * The schedule recurrence size. For example size 4 and unit WEEKLY means the recurrence is every 4 weeks.
   */
  readonly recurrence_size?: number;
  /**
   * The schedule status, options: ACTIVE, FINISHED, CANCELLED.
   */
  readonly status?: string;
  /**
   * The scheduled object. (Payment, PaymentBatch)
   */
  readonly object?: IScheduleAnchorObject;
}

export interface ISchedulePaymentUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ISchedulePaymentRead {
  /**
   * The payment details.
   */
  readonly payment?: ISchedulePaymentEntry;
  /**
   * The schedule details.
   */
  readonly schedule?: ISchedule;
  /**
   * The schedule status, options: ACTIVE, FINISHED, CANCELLED.
   */
  readonly status?: string;
}

export interface ISchedulePaymentListing {
  /**
   * The payment details.
   */
  readonly payment?: ISchedulePaymentEntry;
  /**
   * The schedule details.
   */
  readonly schedule?: ISchedule;
  /**
   * The schedule status, options: ACTIVE, FINISHED, CANCELLED.
   */
  readonly status?: string;
}

export interface ISchedulePaymentEntry {
  /**
   * The Amount transferred by the Payment. Will be negative for outgoing Payments and positive for incoming Payments (relative to the MonetaryAccount indicated by monetary_account_id).
   */
  amount?: IAmount;
  /**
   * The LabelMonetaryAccount containing the public information of the other (counterparty) side of the Payment.
   */
  counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The description for the Payment. Maximum 140 characters for Payments to external IBANs, 9000 characters for Payments to only other bunq MonetaryAccounts.
   */
  description?: string;
  /**
   * The Attachments attached to the Payment.
   */
  attachment?: Array<IAttachmentMonetaryAccountPayment>;
  /**
   * Optional data included with the Payment specific to the merchant.
   */
  merchant_reference?: string;
  /**
   * Whether or not sending a bunq.to payment is allowed.
   */
  allow_bunqto?: boolean;
  /**
   * The LabelMonetaryAccount containing the public information of 'this' (party) side of the Payment.
   */
  readonly alias?: ILabelMonetaryAccount;
}

export interface ISchedulePaymentDelete {}

export interface ISchedulePaymentCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ISchedulePaymentBatchUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ISchedulePaymentBatchDelete {}

export interface ISchedulePaymentBatchCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ISchedulePaymentBatch {
  /**
   * The payment details.
   */
  payments?: Array<ISchedulePaymentEntry>;
  /**
   * The schedule details.
   */
  schedule?: ISchedule;
}

export interface ISchedulePayment {
  /**
   * The payment details.
   */
  payment?: ISchedulePaymentEntry;
  /**
   * The schedule details.
   */
  schedule?: ISchedule;
  /**
   * The schedule status, options: ACTIVE, FINISHED, CANCELLED.
   */
  readonly status?: string;
}

export interface IScheduleListing {
  /**
   * The schedule start time (UTC).
   */
  readonly time_start?: string;
  /**
   * The schedule end time (UTC).
   */
  readonly time_end?: string;
  /**
   * The schedule recurrence unit, options: ONCE, HOURLY, DAILY, WEEKLY, MONTHLY, YEARLY
   */
  readonly recurrence_unit?: string;
  /**
   * The schedule recurrence size. For example size 4 and unit WEEKLY means the recurrence is every 4 weeks.
   */
  readonly recurrence_size?: number;
  /**
   * The schedule status, options: ACTIVE, FINISHED, CANCELLED.
   */
  readonly status?: string;
  /**
   * The scheduled object. (Payment, PaymentBatch)
   */
  readonly object?: IScheduleAnchorObject;
}

export interface IScheduleInstanceUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IScheduleInstanceRead {
  /**
   * The state of the scheduleInstance. (FINISHED_SUCCESSFULLY, RETRY, FAILED_USER_ERROR)
   */
  readonly state?: string;
  /**
   * The schedule start time (UTC).
   */
  readonly time_start?: string;
  /**
   * The schedule end time (UTC).
   */
  readonly time_end?: string;
  /**
   * The message when the scheduled instance has run and failed due to user error.
   */
  readonly error_message?: Array<Error>;
  /**
   * The scheduled object. (Payment, PaymentBatch)
   */
  readonly scheduled_object?: IScheduleAnchorObject;
  /**
   * The result object of this schedule instance. (Payment, PaymentBatch)
   */
  readonly result_object?: IScheduleInstanceAnchorObject;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface IScheduleInstanceListing {
  /**
   * The state of the scheduleInstance. (FINISHED_SUCCESSFULLY, RETRY, FAILED_USER_ERROR)
   */
  readonly state?: string;
  /**
   * The schedule start time (UTC).
   */
  readonly time_start?: string;
  /**
   * The schedule end time (UTC).
   */
  readonly time_end?: string;
  /**
   * The message when the scheduled instance has run and failed due to user error.
   */
  readonly error_message?: Array<Error>;
  /**
   * The scheduled object. (Payment, PaymentBatch)
   */
  readonly scheduled_object?: IScheduleAnchorObject;
  /**
   * The result object of this schedule instance. (Payment, PaymentBatch)
   */
  readonly result_object?: IScheduleInstanceAnchorObject;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface IScheduleInstanceAnchorObject {
  /**
   *
   */
  readonly Payment?: IPayment;
  /**
   *
   */
  readonly PaymentBatch?: IPaymentBatch;
}

export interface IScheduleInstance {
  /**
   * The state of the scheduleInstance. (FINISHED_SUCCESSFULLY, RETRY, FAILED_USER_ERROR)
   */
  state?: string;
  /**
   * The schedule start time (UTC).
   */
  readonly time_start?: string;
  /**
   * The schedule end time (UTC).
   */
  readonly time_end?: string;
  /**
   * The message when the scheduled instance has run and failed due to user error.
   */
  readonly error_message?: Array<Error>;
  /**
   * The scheduled object. (Payment, PaymentBatch)
   */
  readonly scheduled_object?: IScheduleAnchorObject;
  /**
   * The result object of this schedule instance. (Payment, PaymentBatch)
   */
  readonly result_object?: IScheduleInstanceAnchorObject;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface IScheduleAnchorObject {
  /**
   *
   */
  readonly Payment?: IPayment;
  /**
   *
   */
  readonly PaymentBatch?: IPaymentBatch;
}

export interface ISchedule {
  /**
   * The schedule start time (UTC).
   */
  time_start: string;
  /**
   * The schedule end time (UTC).
   */
  time_end?: string;
  /**
   * The schedule recurrence unit, options: ONCE, HOURLY, DAILY, WEEKLY, MONTHLY, YEARLY
   */
  recurrence_unit: RecurrenceUnitType;
  /**
   * The schedule recurrence size. For example size 4 and unit WEEKLY means the recurrence is every 4 weeks.
   */
  recurrence_size: number;
  /**
   * The schedule status, options: ACTIVE, FINISHED, CANCELLED.
   */
  readonly status?: ScheduleStatusType;
  /**
   * The scheduled object. (Payment, PaymentBatch)
   */
  readonly object?: IScheduleAnchorObject;
}

export interface ISandboxUserCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ISandboxUser {}

export interface IRewardSenderRead {
  /**
   * The id of the reward.
   */
  readonly id?: number;
  /**
   * The time the reward was created.
   */
  readonly created?: string;
  /**
   * The time the reward was last updated.
   */
  readonly updated?: string;
  /**
   * The status of the reward.
   */
  readonly status?: string;
  /**
   * The subStatus of the reward.
   */
  readonly sub_status?: string;
  /**
   * The type of the reward.
   */
  readonly type?: string;
  /**
   * The alias of the other user eligible for the reward award.
   */
  readonly counterparty_alias?: ILabelUser;
  /**
   * The amount that will be/was awarded as reward for the reward.
   */
  readonly amount_reward?: IAmount;
}

export interface IRewardSenderListing {
  /**
   * The id of the reward.
   */
  readonly id?: number;
  /**
   * The time the reward was created.
   */
  readonly created?: string;
  /**
   * The time the reward was last updated.
   */
  readonly updated?: string;
  /**
   * The status of the reward.
   */
  readonly status?: string;
  /**
   * The subStatus of the reward.
   */
  readonly sub_status?: string;
  /**
   * The type of the reward.
   */
  readonly type?: string;
  /**
   * The alias of the other user eligible for the reward award.
   */
  readonly counterparty_alias?: ILabelUser;
  /**
   * The amount that will be/was awarded as reward for the reward.
   */
  readonly amount_reward?: IAmount;
}

export interface IRewardSender {
  /**
   * The id of the reward.
   */
  readonly id?: number;
  /**
   * The time the reward was created.
   */
  readonly created?: string;
  /**
   * The time the reward was last updated.
   */
  readonly updated?: string;
  /**
   * The status of the reward.
   */
  readonly status?: string;
  /**
   * The subStatus of the reward.
   */
  readonly sub_status?: string;
  /**
   * The type of the reward.
   */
  readonly type?: string;
  /**
   * The alias of the other user eligible for the reward award.
   */
  readonly counterparty_alias?: ILabelUser;
  /**
   * The amount that will be/was awarded as reward for the reward.
   */
  readonly amount_reward?: IAmount;
}

export interface IRewardRecipientRead {
  /**
   * The id of the reward.
   */
  readonly id?: number;
  /**
   * The time the reward was created.
   */
  readonly created?: string;
  /**
   * The time the reward was last updated.
   */
  readonly updated?: string;
  /**
   * The status of the reward.
   */
  readonly status?: string;
  /**
   * The subStatus of the reward.
   */
  readonly sub_status?: string;
  /**
   * The type of the reward.
   */
  readonly type?: string;
  /**
   * The alias of the other user eligible for the reward award.
   */
  readonly counterparty_alias?: ILabelUser;
  /**
   * The amount that will be/was awarded as reward for the reward.
   */
  readonly amount_reward?: IAmount;
}

export interface IRewardRecipientListing {
  /**
   * The id of the reward.
   */
  readonly id?: number;
  /**
   * The time the reward was created.
   */
  readonly created?: string;
  /**
   * The time the reward was last updated.
   */
  readonly updated?: string;
  /**
   * The status of the reward.
   */
  readonly status?: string;
  /**
   * The subStatus of the reward.
   */
  readonly sub_status?: string;
  /**
   * The type of the reward.
   */
  readonly type?: string;
  /**
   * The alias of the other user eligible for the reward award.
   */
  readonly counterparty_alias?: ILabelUser;
  /**
   * The amount that will be/was awarded as reward for the reward.
   */
  readonly amount_reward?: IAmount;
}

export interface IRewardRecipient {
  /**
   * The id of the reward.
   */
  readonly id?: number;
  /**
   * The time the reward was created.
   */
  readonly created?: string;
  /**
   * The time the reward was last updated.
   */
  readonly updated?: string;
  /**
   * The status of the reward.
   */
  readonly status?: string;
  /**
   * The subStatus of the reward.
   */
  readonly sub_status?: string;
  /**
   * The type of the reward.
   */
  readonly type?: string;
  /**
   * The alias of the other user eligible for the reward award.
   */
  readonly counterparty_alias?: ILabelUser;
  /**
   * The amount that will be/was awarded as reward for the reward.
   */
  readonly amount_reward?: IAmount;
}

export interface IRewardRead {
  /**
   * The id of the reward.
   */
  readonly id?: number;
  /**
   * The time the reward was created.
   */
  readonly created?: string;
  /**
   * The time the reward was last updated.
   */
  readonly updated?: string;
  /**
   * The status of the reward.
   */
  readonly status?: string;
  /**
   * The subStatus of the reward.
   */
  readonly sub_status?: string;
  /**
   * The type of the reward.
   */
  readonly type?: string;
  /**
   * The alias of the other user eligible for the reward award.
   */
  readonly counterparty_alias?: ILabelUser;
  /**
   * The amount that will be/was awarded as reward for the reward.
   */
  readonly amount_reward?: IAmount;
}

export interface IRewardListing {
  /**
   * The id of the reward.
   */
  readonly id?: number;
  /**
   * The time the reward was created.
   */
  readonly created?: string;
  /**
   * The time the reward was last updated.
   */
  readonly updated?: string;
  /**
   * The status of the reward.
   */
  readonly status?: string;
  /**
   * The subStatus of the reward.
   */
  readonly sub_status?: string;
  /**
   * The type of the reward.
   */
  readonly type?: string;
  /**
   * The alias of the other user eligible for the reward award.
   */
  readonly counterparty_alias?: ILabelUser;
  /**
   * The amount that will be/was awarded as reward for the reward.
   */
  readonly amount_reward?: IAmount;
}

export interface IRequestResponseUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IRequestResponseRead {
  /**
   * The id of the Request Response.
   */
  readonly id?: number;
  /**
   * The timestamp when the Request Response was created.
   */
  readonly created?: string;
  /**
   * The timestamp when the Request Response was last updated (will be updated when chat messages are received).
   */
  readonly updated?: string;
  /**
   * The timestamp of when the RequestResponse was responded to.
   */
  readonly time_responded?: string;
  /**
   * The timestamp of when the RequestResponse expired or will expire.
   */
  readonly time_expiry?: string;
  /**
   * The timestamp of when a refund request for the RequestResponse was claimed.
   */
  readonly time_refund_requested?: string;
  /**
   * The timestamp of when the RequestResponse was refunded.
   */
  readonly time_refunded?: string;
  /**
   * The label of the user that requested the refund.
   */
  readonly user_refund_requested?: ILabelUser;
  /**
   * The id of the MonetaryAccount the RequestResponse was received on.
   */
  readonly monetary_account_id?: number;
  /**
   * The requested Amount.
   */
  readonly amount_inquired?: IAmount;
  /**
   * The Amount the RequestResponse was accepted with.
   */
  readonly amount_responded?: IAmount;
  /**
   * The status of the RequestResponse. Can be ACCEPTED, PENDING, REJECTED, REFUND_REQUESTED, REFUNDED or REVOKED.
   */
  readonly status?: string;
  /**
   * The description for the RequestResponse provided by the requesting party. Maximum 9000 characters.
   */
  readonly description?: string;
  /**
   * The LabelMonetaryAccount with the public information of the MonetaryAccount this RequestResponse was received on.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The LabelMonetaryAccount with the public information of the MonetaryAccount that is requesting money with this RequestResponse.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The Attachments attached to the RequestResponse.
   */
  readonly attachment?: Array<IAttachment>;
  /**
   * The minimum age the user accepting the RequestResponse must have.
   */
  readonly minimum_age?: number;
  /**
   * Whether or not an address must be provided on accept.
   */
  readonly require_address?: string;
  /**
   * The Geolocation where the RequestResponse was created.
   */
  readonly geolocation?: IGeolocation;
  /**
   * The type of the RequestInquiry. Can be DIRECT_DEBIT, DIRECT_DEBIT_B2B, IDEAL, SOFORT or INTERNAL.
   */
  readonly type?: string;
  /**
   * The subtype of the RequestInquiry. Can be ONCE or RECURRING for DIRECT_DEBIT RequestInquiries and NONE for all other.
   */
  readonly sub_type?: string;
  /**
   * The URL which the user is sent to after accepting or rejecting the Request.
   */
  readonly redirect_url?: string;
  /**
   * The billing address provided by the accepting user if an address was requested.
   */
  readonly address_billing?: IAddress;
  /**
   * The shipping address provided by the accepting user if an address was requested.
   */
  readonly address_shipping?: IAddress;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The credit scheme id provided by the counterparty for DIRECT_DEBIT inquiries.
   */
  readonly credit_scheme_identifier?: string;
  /**
   * The mandate id provided by the counterparty for DIRECT_DEBIT inquiries.
   */
  readonly mandate_identifier?: string;
  /**
   * The whitelist id for this action or null.
   */
  readonly eligible_whitelist_id?: number;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface IRequestResponseListing {
  /**
   * The id of the Request Response.
   */
  readonly id?: number;
  /**
   * The timestamp when the Request Response was created.
   */
  readonly created?: string;
  /**
   * The timestamp when the Request Response was last updated (will be updated when chat messages are received).
   */
  readonly updated?: string;
  /**
   * The timestamp of when the RequestResponse was responded to.
   */
  readonly time_responded?: string;
  /**
   * The timestamp of when the RequestResponse expired or will expire.
   */
  readonly time_expiry?: string;
  /**
   * The timestamp of when a refund request for the RequestResponse was claimed.
   */
  readonly time_refund_requested?: string;
  /**
   * The timestamp of when the RequestResponse was refunded.
   */
  readonly time_refunded?: string;
  /**
   * The label of the user that requested the refund.
   */
  readonly user_refund_requested?: ILabelUser;
  /**
   * The id of the MonetaryAccount the RequestResponse was received on.
   */
  readonly monetary_account_id?: number;
  /**
   * The requested Amount.
   */
  readonly amount_inquired?: IAmount;
  /**
   * The Amount the RequestResponse was accepted with.
   */
  readonly amount_responded?: IAmount;
  /**
   * The status of the RequestResponse. Can be ACCEPTED, PENDING, REJECTED, REFUND_REQUESTED, REFUNDED or REVOKED.
   */
  readonly status?: string;
  /**
   * The description for the RequestResponse provided by the requesting party. Maximum 9000 characters.
   */
  readonly description?: string;
  /**
   * The LabelMonetaryAccount with the public information of the MonetaryAccount this RequestResponse was received on.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The LabelMonetaryAccount with the public information of the MonetaryAccount that is requesting money with this RequestResponse.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The Attachments attached to the RequestResponse.
   */
  readonly attachment?: Array<IAttachment>;
  /**
   * The minimum age the user accepting the RequestResponse must have.
   */
  readonly minimum_age?: number;
  /**
   * Whether or not an address must be provided on accept.
   */
  readonly require_address?: string;
  /**
   * The Geolocation where the RequestResponse was created.
   */
  readonly geolocation?: IGeolocation;
  /**
   * The type of the RequestInquiry. Can be DIRECT_DEBIT, DIRECT_DEBIT_B2B, IDEAL, SOFORT or INTERNAL.
   */
  readonly type?: string;
  /**
   * The subtype of the RequestInquiry. Can be ONCE or RECURRING for DIRECT_DEBIT RequestInquiries and NONE for all other.
   */
  readonly sub_type?: string;
  /**
   * The URL which the user is sent to after accepting or rejecting the Request.
   */
  readonly redirect_url?: string;
  /**
   * The billing address provided by the accepting user if an address was requested.
   */
  readonly address_billing?: IAddress;
  /**
   * The shipping address provided by the accepting user if an address was requested.
   */
  readonly address_shipping?: IAddress;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The credit scheme id provided by the counterparty for DIRECT_DEBIT inquiries.
   */
  readonly credit_scheme_identifier?: string;
  /**
   * The mandate id provided by the counterparty for DIRECT_DEBIT inquiries.
   */
  readonly mandate_identifier?: string;
  /**
   * The whitelist id for this action or null.
   */
  readonly eligible_whitelist_id?: number;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface IRequestResponse {
  /**
   * The Amount the RequestResponse was accepted with.
   */
  amount_responded?: IAmount;
  /**
   * The status of the RequestResponse. Can be ACCEPTED, PENDING, REJECTED, REFUND_REQUESTED, REFUNDED or REVOKED.
   */
  status?: string;
  /**
   * The shipping address provided by the accepting user if an address was requested.
   */
  address_shipping?: IAddress;
  /**
   * The billing address provided by the accepting user if an address was requested.
   */
  address_billing?: IAddress;
  /**
   * The id of the Request Response.
   */
  readonly id?: number;
  /**
   * The timestamp when the Request Response was created.
   */
  readonly created?: string;
  /**
   * The timestamp when the Request Response was last updated (will be updated when chat messages are received).
   */
  readonly updated?: string;
  /**
   * The timestamp of when the RequestResponse was responded to.
   */
  readonly time_responded?: string;
  /**
   * The timestamp of when the RequestResponse expired or will expire.
   */
  readonly time_expiry?: string;
  /**
   * The timestamp of when a refund request for the RequestResponse was claimed.
   */
  readonly time_refund_requested?: string;
  /**
   * The timestamp of when the RequestResponse was refunded.
   */
  readonly time_refunded?: string;
  /**
   * The label of the user that requested the refund.
   */
  readonly user_refund_requested?: ILabelUser;
  /**
   * The id of the MonetaryAccount the RequestResponse was received on.
   */
  readonly monetary_account_id?: number;
  /**
   * The requested Amount.
   */
  readonly amount_inquired?: IAmount;
  /**
   * The description for the RequestResponse provided by the requesting party. Maximum 9000 characters.
   */
  readonly description?: string;
  /**
   * The LabelMonetaryAccount with the public information of the MonetaryAccount this RequestResponse was received on.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The LabelMonetaryAccount with the public information of the MonetaryAccount that is requesting money with this RequestResponse.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The Attachments attached to the RequestResponse.
   */
  readonly attachment?: Array<IAttachment>;
  /**
   * The minimum age the user accepting the RequestResponse must have.
   */
  readonly minimum_age?: number;
  /**
   * Whether or not an address must be provided on accept.
   */
  readonly require_address?: string;
  /**
   * The Geolocation where the RequestResponse was created.
   */
  readonly geolocation?: IGeolocation;
  /**
   * The type of the RequestInquiry. Can be DIRECT_DEBIT, DIRECT_DEBIT_B2B, IDEAL, SOFORT or INTERNAL.
   */
  readonly type?: string;
  /**
   * The subtype of the RequestInquiry. Can be ONCE or RECURRING for DIRECT_DEBIT RequestInquiries and NONE for all other.
   */
  readonly sub_type?: string;
  /**
   * The URL which the user is sent to after accepting or rejecting the Request.
   */
  readonly redirect_url?: string;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The credit scheme id provided by the counterparty for DIRECT_DEBIT inquiries.
   */
  readonly credit_scheme_identifier?: string;
  /**
   * The mandate id provided by the counterparty for DIRECT_DEBIT inquiries.
   */
  readonly mandate_identifier?: string;
  /**
   * The whitelist id for this action or null.
   */
  readonly eligible_whitelist_id?: number;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface IRequestReferenceSplitTheBillAnchorObject {
  /**
   *
   */
  readonly BillingInvoice?: IInvoice;
  /**
   *
   */
  readonly DraftPayment?: IDraftPayment;
  /**
   *
   */
  readonly MasterCardAction?: IMasterCardAction;
  /**
   *
   */
  readonly Payment?: IPayment;
  /**
   *
   */
  readonly PaymentBatch?: IPaymentBatch;
  /**
   *
   */
  readonly RequestResponse?: IRequestResponse;
  /**
   *
   */
  readonly ScheduleInstance?: IScheduleInstance;
  /**
   *
   */
  readonly TabResultResponse?: ITabResultResponse;
  /**
   *
   */
  readonly WhitelistResult?: IWhitelistResult;
  /**
   *
   */
  readonly TransferwisePayment?: ITransferwiseTransfer;
}

export interface IRequestInquiryUpdate {
  /**
   * The id of the payment request.
   */
  readonly id?: number;
  /**
   * The timestamp of the payment request's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the payment request's last update.
   */
  readonly updated?: string;
  /**
   * The timestamp of when the payment request was responded to.
   */
  readonly time_responded?: string;
  /**
   * The timestamp of when the payment request expired.
   */
  readonly time_expiry?: string;
  /**
   * The id of the monetary account the request response applies to.
   */
  readonly monetary_account_id?: number;
  /**
   * The requested amount.
   */
  readonly amount_inquired?: IAmount;
  /**
   * The responded amount.
   */
  readonly amount_responded?: IAmount;
  /**
   * The label that's displayed to the counterparty with the mutation. Includes user.
   */
  readonly user_alias_created?: ILabelUser;
  /**
   * The label that's displayed to the counterparty with the mutation. Includes user.
   */
  readonly user_alias_revoked?: ILabelUser;
  /**
   * The LabelMonetaryAccount with the public information of the MonetaryAccount the money was requested from.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The description of the inquiry.
   */
  readonly description?: string;
  /**
   * The client's custom reference that was attached to the request and the mutation.
   */
  readonly merchant_reference?: string;
  /**
   * The attachments attached to the payment.
   */
  readonly attachment?: Array<BunqId>;
  /**
   * The status of the request.
   */
  readonly status?: string;
  /**
   * The id of the batch if the request was part of a batch.
   */
  readonly batch_id?: number;
  /**
   * The id of the scheduled job if the request was scheduled.
   */
  readonly scheduled_id?: number;
  /**
   * The minimum age the user accepting the RequestInquiry must have.
   */
  readonly minimum_age?: number;
  /**
   * Whether or not an address must be provided on accept.
   */
  readonly require_address?: string;
  /**
   * The shipping address provided by the accepting user if an address was requested.
   */
  readonly address_shipping?: IAddress;
  /**
   * The billing address provided by the accepting user if an address was requested.
   */
  readonly address_billing?: IAddress;
  /**
   * The geolocation where the payment was done.
   */
  readonly geolocation?: IGeolocation;
  /**
   * The reference to the object used for split the bill. Can be Payment, PaymentBatch, ScheduleInstance, RequestResponse and MasterCardAction
   */
  readonly reference_split_the_bill?: IRequestReferenceSplitTheBillAnchorObject;
}

export interface IRequestInquiryReference {
  /**
   * The type of request inquiry. Can be RequestInquiry or RequestInquiryBatch.
   */
  readonly type?: string;
  /**
   * The id of the request inquiry (batch).
   */
  readonly id?: number;
}

export interface IRequestInquiryRead {
  /**
   * The id of the created RequestInquiry.
   */
  readonly id?: number;
  /**
   * The timestamp of the payment request's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the payment request's last update.
   */
  readonly updated?: string;
  /**
   * The timestamp of when the payment request was responded to.
   */
  readonly time_responded?: string;
  /**
   * The timestamp of when the payment request expired.
   */
  readonly time_expiry?: string;
  /**
   * The id of the monetary account the request response applies to.
   */
  readonly monetary_account_id?: number;
  /**
   * The requested amount.
   */
  readonly amount_inquired?: IAmount;
  /**
   * The responded amount.
   */
  readonly amount_responded?: IAmount;
  /**
   * The label that's displayed to the counterparty with the mutation. Includes user.
   */
  readonly user_alias_created?: ILabelUser;
  /**
   * The label that's displayed to the counterparty with the mutation. Includes user.
   */
  readonly user_alias_revoked?: ILabelUser;
  /**
   * The LabelMonetaryAccount with the public information of the MonetaryAccount the money was requested from.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The description of the inquiry.
   */
  readonly description?: string;
  /**
   * The client's custom reference that was attached to the request and the mutation.
   */
  readonly merchant_reference?: string;
  /**
   * The attachments attached to the payment.
   */
  readonly attachment?: Array<BunqId>;
  /**
   * The status of the request.
   */
  readonly status?: string;
  /**
   * The id of the batch if the request was part of a batch.
   */
  readonly batch_id?: number;
  /**
   * The id of the scheduled job if the request was scheduled.
   */
  readonly scheduled_id?: number;
  /**
   * The minimum age the user accepting the RequestInquiry must have.
   */
  readonly minimum_age?: number;
  /**
   * Whether or not an address must be provided on accept.
   */
  readonly require_address?: string;
  /**
   * The url that points to the bunq.me request.
   */
  readonly bunqme_share_url?: string;
  /**
   * The URL which the user is sent to after accepting or rejecting the Request.
   */
  readonly redirect_url?: string;
  /**
   * The shipping address provided by the accepting user if an address was requested.
   */
  readonly address_shipping?: IAddress;
  /**
   * The billing address provided by the accepting user if an address was requested.
   */
  readonly address_billing?: IAddress;
  /**
   * The geolocation where the payment was done.
   */
  readonly geolocation?: IGeolocation;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The reference to the object used for split the bill. Can be Payment, PaymentBatch, ScheduleInstance, RequestResponse and MasterCardAction
   */
  readonly reference_split_the_bill?: IRequestReferenceSplitTheBillAnchorObject;
}

export interface IRequestInquiryListing {
  /**
   * The id of the created RequestInquiry.
   */
  readonly id?: number;
  /**
   * The timestamp of the payment request's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the payment request's last update.
   */
  readonly updated?: string;
  /**
   * The timestamp of when the payment request was responded to.
   */
  readonly time_responded?: string;
  /**
   * The timestamp of when the payment request expired.
   */
  readonly time_expiry?: string;
  /**
   * The id of the monetary account the request response applies to.
   */
  readonly monetary_account_id?: number;
  /**
   * The requested amount.
   */
  readonly amount_inquired?: IAmount;
  /**
   * The responded amount.
   */
  readonly amount_responded?: IAmount;
  /**
   * The label that's displayed to the counterparty with the mutation. Includes user.
   */
  readonly user_alias_created?: ILabelUser;
  /**
   * The label that's displayed to the counterparty with the mutation. Includes user.
   */
  readonly user_alias_revoked?: ILabelUser;
  /**
   * The LabelMonetaryAccount with the public information of the MonetaryAccount the money was requested from.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The description of the inquiry.
   */
  readonly description?: string;
  /**
   * The client's custom reference that was attached to the request and the mutation.
   */
  readonly merchant_reference?: string;
  /**
   * The attachments attached to the payment.
   */
  readonly attachment?: Array<BunqId>;
  /**
   * The status of the request.
   */
  readonly status?: string;
  /**
   * The id of the batch if the request was part of a batch.
   */
  readonly batch_id?: number;
  /**
   * The id of the scheduled job if the request was scheduled.
   */
  readonly scheduled_id?: number;
  /**
   * The minimum age the user accepting the RequestInquiry must have.
   */
  readonly minimum_age?: number;
  /**
   * Whether or not an address must be provided on accept.
   */
  readonly require_address?: string;
  /**
   * The url that points to the bunq.me request.
   */
  readonly bunqme_share_url?: string;
  /**
   * The URL which the user is sent to after accepting or rejecting the Request.
   */
  readonly redirect_url?: string;
  /**
   * The shipping address provided by the accepting user if an address was requested.
   */
  readonly address_shipping?: IAddress;
  /**
   * The billing address provided by the accepting user if an address was requested.
   */
  readonly address_billing?: IAddress;
  /**
   * The geolocation where the payment was done.
   */
  readonly geolocation?: IGeolocation;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The reference to the object used for split the bill. Can be Payment, PaymentBatch, ScheduleInstance, RequestResponse and MasterCardAction
   */
  readonly reference_split_the_bill?: IRequestReferenceSplitTheBillAnchorObject;
}

export interface IRequestInquiryCreate {
  /**
   * The id of the created RequestInquiry.
   */
  readonly id?: number;
}

export interface IRequestInquiryBatchUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IRequestInquiryBatchRead {
  /**
   * The list of requests that were made.
   */
  readonly request_inquiries?: Array<IRequestInquiry>;
  /**
   * The total amount originally inquired for this batch.
   */
  readonly total_amount_inquired?: IAmount;
  /**
   * The reference to the object used for split the bill. Can be Payment, PaymentBatch, ScheduleInstance, RequestResponse and MasterCardAction
   */
  readonly reference_split_the_bill?: IRequestReferenceSplitTheBillAnchorObject;
}

export interface IRequestInquiryBatchListing {
  /**
   * The list of requests that were made.
   */
  readonly request_inquiries?: Array<IRequestInquiry>;
  /**
   * The total amount originally inquired for this batch.
   */
  readonly total_amount_inquired?: IAmount;
  /**
   * The reference to the object used for split the bill. Can be Payment, PaymentBatch, ScheduleInstance, RequestResponse and MasterCardAction
   */
  readonly reference_split_the_bill?: IRequestReferenceSplitTheBillAnchorObject;
}

export interface IRequestInquiryBatchCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IRequestInquiryBatch {
  /**
   * The list of requests that were made.
   */
  request_inquiries?: Array<IRequestInquiry>;
  /**
   * The status of the request.
   */
  status?: string;
  /**
   * The total amount originally inquired for this batch.
   */
  total_amount_inquired?: IAmount;
  /**
   * The ID of the associated event if the request batch was made using 'split the bill'.
   */
  event_id?: number;
  /**
   * The reference to the object used for split the bill. Can be Payment, PaymentBatch, ScheduleInstance, RequestResponse and MasterCardAction
   */
  readonly reference_split_the_bill?: IRequestReferenceSplitTheBillAnchorObject;
}

export interface IRequestInquiry {
  /**
   * The requested amount.
   */
  amount_inquired?: IAmount;
  /**
   * The LabelMonetaryAccount with the public information of the MonetaryAccount the money was requested from.
   */
  counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The description of the inquiry.
   */
  description?: string;
  /**
   * The attachments attached to the payment.
   */
  attachment?: Array<BunqId>;
  /**
   * The client's custom reference that was attached to the request and the mutation.
   */
  merchant_reference?: string;
  /**
   * The status of the request.
   */
  status?: string;
  /**
   * The minimum age the user accepting the RequestInquiry must have.
   */
  minimum_age?: number;
  /**
   * Whether or not an address must be provided on accept.
   */
  require_address?: string;
  /**
   * [DEPRECATED] Whether or not the accepting user can give an extra tip on top of the requested Amount. Defaults to false.
   */
  want_tip?: boolean;
  /**
   * [DEPRECATED] Whether or not the accepting user can choose to accept with a lower amount than requested. Defaults to false.
   */
  allow_amount_lower?: boolean;
  /**
   * [DEPRECATED] Whether or not the accepting user can choose to accept with a higher amount than requested. Defaults to false.
   */
  allow_amount_higher?: boolean;
  /**
   * Whether or not sending a bunq.me request is allowed.
   */
  allow_bunqme: boolean;
  /**
   * The URL which the user is sent to after accepting or rejecting the Request.
   */
  redirect_url?: string;
  /**
   * The ID of the associated event if the request was made using 'split the bill'.
   */
  event_id?: number;
  /**
   * The id of the created RequestInquiry.
   */
  readonly id?: number;
  /**
   * The timestamp of the payment request's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the payment request's last update.
   */
  readonly updated?: string;
  /**
   * The timestamp of when the payment request was responded to.
   */
  readonly time_responded?: string;
  /**
   * The timestamp of when the payment request expired.
   */
  readonly time_expiry?: string;
  /**
   * The id of the monetary account the request response applies to.
   */
  readonly monetary_account_id?: number;
  /**
   * The responded amount.
   */
  readonly amount_responded?: IAmount;
  /**
   * The label that's displayed to the counterparty with the mutation. Includes user.
   */
  readonly user_alias_created?: ILabelUser;
  /**
   * The label that's displayed to the counterparty with the mutation. Includes user.
   */
  readonly user_alias_revoked?: ILabelUser;
  /**
   * The id of the batch if the request was part of a batch.
   */
  readonly batch_id?: number;
  /**
   * The id of the scheduled job if the request was scheduled.
   */
  readonly scheduled_id?: number;
  /**
   * The url that points to the bunq.me request.
   */
  readonly bunqme_share_url?: string;
  /**
   * The shipping address provided by the accepting user if an address was requested.
   */
  readonly address_shipping?: IAddress;
  /**
   * The billing address provided by the accepting user if an address was requested.
   */
  readonly address_billing?: IAddress;
  /**
   * The geolocation where the payment was done.
   */
  readonly geolocation?: IGeolocation;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The reference to the object used for split the bill. Can be Payment, PaymentBatch, ScheduleInstance, RequestResponse and MasterCardAction
   */
  readonly reference_split_the_bill?: IRequestReferenceSplitTheBillAnchorObject;
}

export interface IPointer {
  /**
   * The alias type, can be: EMAIL|PHONE_NUMBER|IBAN.
   */
  type?: string;
  /**
   * The alias value.
   */
  value?: string;
  /**
   * The alias name.
   */
  name?: string;
}

export interface IPermittedIpUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IPermittedIpRead {
  /**
   * The IP address.
   */
  readonly ip?: string;
  /**
   * The status of the IP. May be "ACTIVE" or "INACTIVE". It is only possible to make requests from "ACTIVE" IP addresses. Only "ACTIVE" IPs will be billed.
   */
  readonly status?: string;
}

export interface IPermittedIpListing {
  /**
   * The IP address.
   */
  readonly ip?: string;
  /**
   * The status of the IP. May be "ACTIVE" or "INACTIVE". It is only possible to make requests from "ACTIVE" IP addresses. Only "ACTIVE" IPs will be billed.
   */
  readonly status?: string;
}

export interface IPermittedIpCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IPermittedIp {
  /**
   * The IP address.
   */
  ip: string;
  /**
   * The status of the IP. May be "ACTIVE" or "INACTIVE". It is only possible to make requests from "ACTIVE" IP addresses. Only "ACTIVE" IPs will be billed.
   */
  status?: string;
}

export interface IPermittedDevice {
  /**
   * The description of the device that may use the credential.
   */
  readonly description?: string;
  /**
   * The IP address of the device that may use the credential.
   */
  readonly ip?: string;
}

export interface IPaymentServiceProviderCredentialRead {
  /**
   * The id of the credential.
   */
  readonly id?: number;
  /**
   * The timestamp of the credential object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the credential object's last update.
   */
  readonly updated?: string;
  /**
   * The status of the credential.
   */
  readonly status?: string;
  /**
   * When the status is PENDING_FIRST_USE: when the credential expires.
   */
  readonly expiry_time?: string;
  /**
   * When the status is PENDING_FIRST_USE: the value of the token.
   */
  readonly token_value?: string;
  /**
   * When the status is ACTIVE: the details of the device that may use the credential.
   */
  readonly permitted_device?: IPermittedDevice;
}

export interface IPaymentServiceProviderCredentialCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IPaymentServiceProviderCredential {
  /**
   * Payment Services Directive 2 compatible QSEAL certificate
   */
  client_payment_service_provider_certificate: string;
  /**
   * Intermediate and root certificate belonging to the provided certificate.
   */
  client_payment_service_provider_certificate_chain: string;
  /**
   * The Base64 encoded signature of the public key provided during installation and with the installation token appended as a nonce. Signed with the private key belonging to the QSEAL certificate.
   */
  client_public_key_signature: string;
}

export interface IPaymentRead {
  /**
   * The id of the created Payment.
   */
  readonly id?: number;
  /**
   * The timestamp when the Payment was done.
   */
  readonly created?: string;
  /**
   * The timestamp when the Payment was last updated (will be updated when chat messages are received).
   */
  readonly updated?: string;
  /**
   * The id of the MonetaryAccount the Payment was made to or from (depending on whether this is an incoming or outgoing Payment).
   */
  readonly monetary_account_id?: number;
  /**
   * The Amount transferred by the Payment. Will be negative for outgoing Payments and positive for incoming Payments (relative to the MonetaryAccount indicated by monetary_account_id).
   */
  readonly amount?: IAmount;
  /**
   * The LabelMonetaryAccount containing the public information of 'this' (party) side of the Payment.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The LabelMonetaryAccount containing the public information of the other (counterparty) side of the Payment.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The description for the Payment. Maximum 140 characters for Payments to external IBANs, 9000 characters for Payments to only other bunq MonetaryAccounts.
   */
  readonly description?: string;
  /**
   * The type of Payment, can be BUNQ, EBA_SCT, EBA_SDD, IDEAL, SWIFT or FIS (card).
   */
  readonly type?: string;
  /**
   * The sub-type of the Payment, can be PAYMENT, WITHDRAWAL, REVERSAL, REQUEST, BILLING, SCT, SDD or NLO.
   */
  readonly sub_type?: string;
  /**
   * The status of the bunq.to payment.
   */
  readonly bunqto_status?: string;
  /**
   * The sub status of the bunq.to payment.
   */
  readonly bunqto_sub_status?: string;
  /**
   * The status of the bunq.to payment.
   */
  readonly bunqto_share_url?: string;
  /**
   * When bunq.to payment is about to expire.
   */
  readonly bunqto_expiry?: string;
  /**
   * The timestamp of when the bunq.to payment was responded to.
   */
  readonly bunqto_time_responded?: string;
  /**
   * The Attachments attached to the Payment.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
  /**
   * Optional data included with the Payment specific to the merchant.
   */
  readonly merchant_reference?: string;
  /**
   * The id of the PaymentBatch if this Payment was part of one.
   */
  readonly batch_id?: number;
  /**
   * The id of the JobScheduled if the Payment was scheduled.
   */
  readonly scheduled_id?: number;
  /**
   * A shipping Address provided with the Payment, currently unused.
   */
  readonly address_shipping?: IAddress;
  /**
   * A billing Address provided with the Payment, currently unused.
   */
  readonly address_billing?: IAddress;
  /**
   * The Geolocation where the Payment was done from.
   */
  readonly geolocation?: IGeolocation;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
  /**
   * The new balance of the monetary account after the mutation.
   */
  readonly balance_after_mutation?: IAmount;
}

export interface IPaymentListing {
  /**
   * The id of the created Payment.
   */
  readonly id?: number;
  /**
   * The timestamp when the Payment was done.
   */
  readonly created?: string;
  /**
   * The timestamp when the Payment was last updated (will be updated when chat messages are received).
   */
  readonly updated?: string;
  /**
   * The id of the MonetaryAccount the Payment was made to or from (depending on whether this is an incoming or outgoing Payment).
   */
  readonly monetary_account_id?: number;
  /**
   * The Amount transferred by the Payment. Will be negative for outgoing Payments and positive for incoming Payments (relative to the MonetaryAccount indicated by monetary_account_id).
   */
  readonly amount?: IAmount;
  /**
   * The LabelMonetaryAccount containing the public information of 'this' (party) side of the Payment.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The LabelMonetaryAccount containing the public information of the other (counterparty) side of the Payment.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The description for the Payment. Maximum 140 characters for Payments to external IBANs, 9000 characters for Payments to only other bunq MonetaryAccounts.
   */
  readonly description?: string;
  /**
   * The type of Payment, can be BUNQ, EBA_SCT, EBA_SDD, IDEAL, SWIFT or FIS (card).
   */
  readonly type?: string;
  /**
   * The sub-type of the Payment, can be PAYMENT, WITHDRAWAL, REVERSAL, REQUEST, BILLING, SCT, SDD or NLO.
   */
  readonly sub_type?: string;
  /**
   * The status of the bunq.to payment.
   */
  readonly bunqto_status?: string;
  /**
   * The sub status of the bunq.to payment.
   */
  readonly bunqto_sub_status?: string;
  /**
   * The status of the bunq.to payment.
   */
  readonly bunqto_share_url?: string;
  /**
   * When bunq.to payment is about to expire.
   */
  readonly bunqto_expiry?: string;
  /**
   * The timestamp of when the bunq.to payment was responded to.
   */
  readonly bunqto_time_responded?: string;
  /**
   * The Attachments attached to the Payment.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
  /**
   * Optional data included with the Payment specific to the merchant.
   */
  readonly merchant_reference?: string;
  /**
   * The id of the PaymentBatch if this Payment was part of one.
   */
  readonly batch_id?: number;
  /**
   * The id of the JobScheduled if the Payment was scheduled.
   */
  readonly scheduled_id?: number;
  /**
   * A shipping Address provided with the Payment, currently unused.
   */
  readonly address_shipping?: IAddress;
  /**
   * A billing Address provided with the Payment, currently unused.
   */
  readonly address_billing?: IAddress;
  /**
   * The Geolocation where the Payment was done from.
   */
  readonly geolocation?: IGeolocation;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
  /**
   * The new balance of the monetary account after the mutation.
   */
  readonly balance_after_mutation?: IAmount;
}

export interface IPaymentCreate {
  /**
   * The id of the created Payment.
   */
  readonly id?: number;
}

export interface IPaymentBatchUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IPaymentBatchRead {
  /**
   * The list of mutations that were made.
   */
  readonly payments?: Array<IPayment>;
}

export interface IPaymentBatchListing {
  /**
   * The list of mutations that were made.
   */
  readonly payments?: Array<IPayment>;
}

export interface IPaymentBatchCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IPaymentBatch {
  /**
   * The list of mutations that were made.
   */
  payments?: Array<IPayment>;
}

export interface IPayment {
  /**
   * The Amount transferred by the Payment. Will be negative for outgoing Payments and positive for incoming Payments (relative to the MonetaryAccount indicated by monetary_account_id).
   */
  amount?: IAmount;
  /**
   * The LabelMonetaryAccount containing the public information of the other (counterparty) side of the Payment.
   */
  counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The description for the Payment. Maximum 140 characters for Payments to external IBANs, 9000 characters for Payments to only other bunq MonetaryAccounts.
   */
  description?: string;
  /**
   * The Attachments attached to the Payment.
   */
  attachment?: Array<IAttachmentMonetaryAccountPayment>;
  /**
   * Optional data included with the Payment specific to the merchant.
   */
  merchant_reference?: string;
  /**
   * Whether or not sending a bunq.to payment is allowed.
   */
  allow_bunqto?: boolean;
  /**
   * The id of the created Payment.
   */
  readonly id?: number;
  /**
   * The timestamp when the Payment was done.
   */
  readonly created?: string;
  /**
   * The timestamp when the Payment was last updated (will be updated when chat messages are received).
   */
  readonly updated?: string;
  /**
   * The id of the MonetaryAccount the Payment was made to or from (depending on whether this is an incoming or outgoing Payment).
   */
  readonly monetary_account_id?: number;
  /**
   * The LabelMonetaryAccount containing the public information of 'this' (party) side of the Payment.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The type of Payment, can be BUNQ, EBA_SCT, EBA_SDD, IDEAL, SWIFT or FIS (card).
   */
  readonly type?: string;
  /**
   * The sub-type of the Payment, can be PAYMENT, WITHDRAWAL, REVERSAL, REQUEST, BILLING, SCT, SDD or NLO.
   */
  readonly sub_type?: string;
  /**
   * The status of the bunq.to payment.
   */
  readonly bunqto_status?: string;
  /**
   * The sub status of the bunq.to payment.
   */
  readonly bunqto_sub_status?: string;
  /**
   * The status of the bunq.to payment.
   */
  readonly bunqto_share_url?: string;
  /**
   * When bunq.to payment is about to expire.
   */
  readonly bunqto_expiry?: string;
  /**
   * The timestamp of when the bunq.to payment was responded to.
   */
  readonly bunqto_time_responded?: string;
  /**
   * The id of the PaymentBatch if this Payment was part of one.
   */
  readonly batch_id?: number;
  /**
   * The id of the JobScheduled if the Payment was scheduled.
   */
  readonly scheduled_id?: number;
  /**
   * A shipping Address provided with the Payment, currently unused.
   */
  readonly address_shipping?: IAddress;
  /**
   * A billing Address provided with the Payment, currently unused.
   */
  readonly address_billing?: IAddress;
  /**
   * The Geolocation where the Payment was done from.
   */
  readonly geolocation?: IGeolocation;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
  /**
   * The new balance of the monetary account after the mutation.
   */
  readonly balance_after_mutation?: IAmount;
}

export interface IOauthClientUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IOauthClientRead {
  /**
   * Id of the client.
   */
  readonly id?: number;
  /**
   * The status of the pack group, can be ACTIVE, CANCELLED or CANCELLED_PENDING.
   */
  readonly status?: string;
  /**
   * The Client ID associated with this Oauth Client
   */
  readonly client_id?: string;
  /**
   * Secret associated with this Oauth Client
   */
  readonly secret?: string;
  /**
   * The callback URLs which are bound to this Oauth Client
   */
  readonly callback_url?: Array<IOauthCallbackUrl>;
}

export interface IOauthClientListing {
  /**
   * Id of the client.
   */
  readonly id?: number;
  /**
   * The status of the pack group, can be ACTIVE, CANCELLED or CANCELLED_PENDING.
   */
  readonly status?: string;
  /**
   * The Client ID associated with this Oauth Client
   */
  readonly client_id?: string;
  /**
   * Secret associated with this Oauth Client
   */
  readonly secret?: string;
  /**
   * The callback URLs which are bound to this Oauth Client
   */
  readonly callback_url?: Array<IOauthCallbackUrl>;
}

export interface IOauthClientCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IOauthClient {
  /**
   * The status of the Oauth Client, can be ACTIVE or CANCELLED.
   */
  status?: string;
}

export interface IOauthCallbackUrlUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IOauthCallbackUrlRead {
  /**
   * The URL for this callback.
   */
  readonly url?: string;
}

export interface IOauthCallbackUrlListing {
  /**
   * The URL for this callback.
   */
  readonly url?: string;
}

export interface IOauthCallbackUrlDelete {}

export interface IOauthCallbackUrlCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IOauthCallbackUrl {
  /**
   * The URL for this callback.
   */
  url: string;
}

export interface INotificationFilterUrlUserListing {
  /**
   * The types of notifications that will result in a url notification for this user.
   */
  readonly notification_filters?: Array<INotificationFilterUrl>;
}

export interface INotificationFilterUrlUserCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INotificationFilterUrlUser {
  /**
   * The types of notifications that will result in a url notification for this user.
   */
  notification_filters?: Array<INotificationFilterUrl>;
}

export interface INotificationFilterUrlMonetaryAccountListing {
  /**
   * The types of notifications that will result in a url notification for this monetary account.
   */
  readonly notification_filters?: Array<INotificationFilterUrl>;
}

export interface INotificationFilterUrlMonetaryAccountCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INotificationFilterUrlMonetaryAccount {
  /**
   * The types of notifications that will result in a url notification for this monetary account.
   */
  notification_filters?: Array<INotificationFilterUrl>;
}

export interface INotificationFilterUrl {
  /**
   * The notification category that will match this notification filter.
   */
  category?: string;
  /**
   * The URL to which the callback should be made.
   */
  notification_target?: string;
  /**
   * The id of the NotificationFilterUrl.
   */
  readonly id?: number;
  /**
   * The timestamp of the NotificationFilterUrl's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the NotificationFilterUrl's last update.
   */
  readonly updated?: string;
}

export interface INotificationFilterPushUserListing {
  /**
   * The types of notifications that will result in a push notification for this user.
   */
  readonly notification_filters?: Array<INotificationFilterPush>;
}

export interface INotificationFilterPushUserCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INotificationFilterPushUser {
  /**
   * The types of notifications that will result in a push notification for this user.
   */
  notification_filters?: Array<INotificationFilterPush>;
}

export interface INotificationFilterPush {
  /**
   * The notification category that will match this notification filter.
   */
  category?: string;
}

export interface INotificationFilter {
  /**
   * The delivery method via which notifications that match this notification filter will be delivered. Possible choices are PUSH for delivery via push notification and URL for delivery via URL callback.
   */
  notification_delivery_method: NotificationDeliveryMethodType;
  /**
   * The target of notifications that match this notification filter. For URL notification filters this is the URL to which the callback will be made. For PUSH notifications filters this should always be null.
   */
  notification_target: string;
  /**
   * The notification category that will match this notification filter. Possible choices are BILLING, CARD_TRANSACTION_FAILED, CARD_TRANSACTION_SUCCESSFUL, CHAT, DRAFT_PAYMENT, IDEAL, SOFORT, MONETARY_ACCOUNT_PROFILE, MUTATION, PAYMENT, PROMOTION, REQUEST, SCHEDULE_RESULT, SCHEDULE_STATUS, SHARE, SUPPORT, TAB_RESULT, USER_APPROVAL.
   */
  category: NotificationCategoryType;
}

export interface INoteTextWhitelistResultUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextWhitelistResultRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextWhitelistResultListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextWhitelistResultDelete {}

export interface INoteTextWhitelistResultCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextWhitelistResult {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextSofortMerchantTransactionUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextSofortMerchantTransactionRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextSofortMerchantTransactionListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextSofortMerchantTransactionDelete {}

export interface INoteTextSofortMerchantTransactionCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextSofortMerchantTransaction {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextSchedulePaymentUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextSchedulePaymentRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextSchedulePaymentListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextSchedulePaymentDelete {}

export interface INoteTextSchedulePaymentCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextSchedulePaymentBatchUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextSchedulePaymentBatchRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextSchedulePaymentBatchListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextSchedulePaymentBatchDelete {}

export interface INoteTextSchedulePaymentBatchCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextSchedulePaymentBatch {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextSchedulePayment {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextScheduleInstanceUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextScheduleInstanceRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextScheduleInstanceListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextScheduleInstanceDelete {}

export interface INoteTextScheduleInstanceCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextScheduleInstance {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextRequestResponseUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextRequestResponseRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextRequestResponseListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextRequestResponseDelete {}

export interface INoteTextRequestResponseCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextRequestResponse {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextRequestInquiryUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextRequestInquiryRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextRequestInquiryListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextRequestInquiryDelete {}

export interface INoteTextRequestInquiryCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextRequestInquiryBatchUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextRequestInquiryBatchRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextRequestInquiryBatchListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextRequestInquiryBatchDelete {}

export interface INoteTextRequestInquiryBatchCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextRequestInquiryBatch {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextRequestInquiry {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextPaymentUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextPaymentRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextPaymentListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextPaymentDelete {}

export interface INoteTextPaymentCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextPaymentBatchUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextPaymentBatchRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextPaymentBatchListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextPaymentBatchDelete {}

export interface INoteTextPaymentBatchCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextPaymentBatch {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextPayment {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextMasterCardActionUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextMasterCardActionRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextMasterCardActionListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextMasterCardActionDelete {}

export interface INoteTextMasterCardActionCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextMasterCardAction {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextIdealMerchantTransactionUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextIdealMerchantTransactionRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextIdealMerchantTransactionListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextIdealMerchantTransactionDelete {}

export interface INoteTextIdealMerchantTransactionCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextIdealMerchantTransaction {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextDraftPaymentUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextDraftPaymentRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextDraftPaymentListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextDraftPaymentDelete {}

export interface INoteTextDraftPaymentCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextDraftPayment {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextBunqMeFundraiserResultUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextBunqMeFundraiserResultRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextBunqMeFundraiserResultListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextBunqMeFundraiserResultDelete {}

export interface INoteTextBunqMeFundraiserResultCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextBunqMeFundraiserResult {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteTextBankSwitchServiceNetherlandsIncomingPaymentUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextBankSwitchServiceNetherlandsIncomingPaymentRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextBankSwitchServiceNetherlandsIncomingPaymentListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * The content of the note.
   */
  readonly content?: string;
}

export interface INoteTextBankSwitchServiceNetherlandsIncomingPaymentDelete {}

export interface INoteTextBankSwitchServiceNetherlandsIncomingPaymentCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteTextBankSwitchServiceNetherlandsIncomingPayment {
  /**
   * The content of the note.
   */
  content?: string;
}

export interface INoteAttachmentWhitelistResultUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentWhitelistResultRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentWhitelistResultListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentWhitelistResultDelete {}

export interface INoteAttachmentWhitelistResultCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentWhitelistResult {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentSofortMerchantTransactionUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentSofortMerchantTransactionRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentSofortMerchantTransactionListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentSofortMerchantTransactionDelete {}

export interface INoteAttachmentSofortMerchantTransactionCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentSofortMerchantTransaction {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentSchedulePaymentUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentSchedulePaymentRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentSchedulePaymentListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentSchedulePaymentDelete {}

export interface INoteAttachmentSchedulePaymentCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentSchedulePaymentBatchUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentSchedulePaymentBatchRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentSchedulePaymentBatchListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentSchedulePaymentBatchDelete {}

export interface INoteAttachmentSchedulePaymentBatchCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentSchedulePaymentBatch {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentSchedulePayment {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentScheduleInstanceUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentScheduleInstanceRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentScheduleInstanceListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentScheduleInstanceDelete {}

export interface INoteAttachmentScheduleInstanceCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentScheduleInstance {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentRequestResponseUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentRequestResponseRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentRequestResponseListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentRequestResponseDelete {}

export interface INoteAttachmentRequestResponseCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentRequestResponse {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentRequestInquiryUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentRequestInquiryRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentRequestInquiryListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentRequestInquiryDelete {}

export interface INoteAttachmentRequestInquiryCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentRequestInquiryBatchUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentRequestInquiryBatchRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentRequestInquiryBatchListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentRequestInquiryBatchDelete {}

export interface INoteAttachmentRequestInquiryBatchCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentRequestInquiryBatch {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentRequestInquiry {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentPaymentUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentPaymentRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentPaymentListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentPaymentDelete {}

export interface INoteAttachmentPaymentCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentPaymentBatchUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentPaymentBatchRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentPaymentBatchListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentPaymentBatchDelete {}

export interface INoteAttachmentPaymentBatchCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentPaymentBatch {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentPayment {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentMasterCardActionUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentMasterCardActionRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentMasterCardActionListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentMasterCardActionDelete {}

export interface INoteAttachmentMasterCardActionCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentMasterCardAction {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentIdealMerchantTransactionUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentIdealMerchantTransactionRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentIdealMerchantTransactionListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentIdealMerchantTransactionDelete {}

export interface INoteAttachmentIdealMerchantTransactionCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentIdealMerchantTransaction {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentDraftPaymentUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentDraftPaymentRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentDraftPaymentListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentDraftPaymentDelete {}

export interface INoteAttachmentDraftPaymentCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentDraftPayment {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentBunqMeFundraiserResultUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentBunqMeFundraiserResultRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentBunqMeFundraiserResultListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentBunqMeFundraiserResultDelete {}

export interface INoteAttachmentBunqMeFundraiserResultCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentBunqMeFundraiserResult {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface INoteAttachmentBankSwitchServiceNetherlandsIncomingPaymentUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentBankSwitchServiceNetherlandsIncomingPaymentRead {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentBankSwitchServiceNetherlandsIncomingPaymentListing {
  /**
   * The id of the note.
   */
  readonly id?: number;
  /**
   * The timestamp of the note's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the note's last update.
   */
  readonly updated?: string;
  /**
   * The label of the user who created this note.
   */
  readonly label_user_creator?: ILabelUser;
  /**
   * Optional description of the attachment.
   */
  readonly description?: string;
  /**
   * The attachment attached to the note.
   */
  readonly attachment?: Array<IAttachmentMonetaryAccountPayment>;
}

export interface INoteAttachmentBankSwitchServiceNetherlandsIncomingPaymentDelete {}

export interface INoteAttachmentBankSwitchServiceNetherlandsIncomingPaymentCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface INoteAttachmentBankSwitchServiceNetherlandsIncomingPayment {
  /**
   * Optional description of the attachment.
   */
  description?: string;
  /**
   * The reference to the uploaded file to attach to this note.
   */
  attachment_id: number;
}

export interface IMonetaryAccountSetting {
  /**
   * The color chosen for the MonetaryAccount.
   */
  color?: string;
  /**
   * The icon chosen for the MonetaryAccount.
   */
  icon?: string;
  /**
   * The status of the avatar. Can be either AVATAR_DEFAULT, AVATAR_CUSTOM or AVATAR_UNDETERMINED.
   */
  default_avatar_status?: string;
  /**
   * The chat restriction. Possible values are ALLOW_INCOMING or BLOCK_INCOMING
   */
  restriction_chat?: string;
}

export interface IMonetaryAccountSavingsUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IMonetaryAccountSavingsRead {
  /**
   * The id of the MonetaryAccountSavings.
   */
  readonly id?: number;
  /**
   * The timestamp of the MonetaryAccountSavings's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the MonetaryAccountSavings's last update.
   */
  readonly updated?: string;
  /**
   * The Avatar of the MonetaryAccountSavings.
   */
  readonly avatar?: IAvatar;
  /**
   * The currency of the MonetaryAccountSavings as an ISO 4217 formatted currency code.
   */
  readonly currency?: string;
  /**
   * The description of the MonetaryAccountSavings. Defaults to 'bunq account'.
   */
  readonly description?: string;
  /**
   * The daily spending limit Amount of the MonetaryAccountSavings. Defaults to 1000 EUR. Currency must match the MonetaryAccountSavings's currency. Limited to 10000 EUR.
   */
  readonly daily_limit?: IAmount;
  /**
   * The maximum Amount the MonetaryAccountSavings can be 'in the red'. Must be 0 EUR or omitted.
   */
  readonly overdraft_limit?: IAmount;
  /**
   * The current available balance Amount of the MonetaryAccountSavings.
   */
  readonly balance?: IAmount;
  /**
   * The Aliases for the MonetaryAccountSavings.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The MonetaryAccountSavings's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The status of the MonetaryAccountSavings. Can be: ACTIVE, BLOCKED, CANCELLED or PENDING_REOPEN
   */
  readonly status?: string;
  /**
   * The sub-status of the MonetaryAccountSavings providing extra information regarding the status. Will be NONE for ACTIVE or PENDING_REOPEN, COMPLETELY or ONLY_ACCEPTING_INCOMING for BLOCKED and REDEMPTION_INVOLUNTARY, REDEMPTION_VOLUNTARY or PERMANENT for CANCELLED.
   */
  readonly sub_status?: string;
  /**
   * The reason for voluntarily cancelling (closing) the MonetaryAccountSavings, can only be OTHER.
   */
  readonly reason?: string;
  /**
   * The optional free-form reason for voluntarily cancelling (closing) the MonetaryAccountSavings. Can be any user provided message.
   */
  readonly reason_description?: string;
  /**
   * The users the account will be joint with.
   */
  readonly all_co_owner?: Array<ICoOwner>;
  /**
   * The id of the User who owns the MonetaryAccountSavings.
   */
  readonly user_id?: number;
  /**
   * The profile of the account.
   */
  readonly monetary_account_profile?: IMonetaryAccountProfile;
  /**
   * The settings of the MonetaryAccountSavings.
   */
  readonly setting?: IMonetaryAccountSetting;
  /**
   * The Savings Goal set for this MonetaryAccountSavings.
   */
  readonly savings_goal?: IAmount;
  /**
   * The progress in percentages for the Savings Goal set for this MonetaryAccountSavings.
   */
  readonly savings_goal_progress?: number;
  /**
   * The id of the AutoSave.
   */
  readonly auto_save_id?: number;
  /**
   * The ids of the AutoSave.
   */
  readonly all_auto_save_id?: Array<BunqId>;
}

export interface IMonetaryAccountSavingsListing {
  /**
   * The id of the MonetaryAccountSavings.
   */
  readonly id?: number;
  /**
   * The timestamp of the MonetaryAccountSavings's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the MonetaryAccountSavings's last update.
   */
  readonly updated?: string;
  /**
   * The Avatar of the MonetaryAccountSavings.
   */
  readonly avatar?: IAvatar;
  /**
   * The currency of the MonetaryAccountSavings as an ISO 4217 formatted currency code.
   */
  readonly currency?: string;
  /**
   * The description of the MonetaryAccountSavings. Defaults to 'bunq account'.
   */
  readonly description?: string;
  /**
   * The daily spending limit Amount of the MonetaryAccountSavings. Defaults to 1000 EUR. Currency must match the MonetaryAccountSavings's currency. Limited to 10000 EUR.
   */
  readonly daily_limit?: IAmount;
  /**
   * The maximum Amount the MonetaryAccountSavings can be 'in the red'. Must be 0 EUR or omitted.
   */
  readonly overdraft_limit?: IAmount;
  /**
   * The current available balance Amount of the MonetaryAccountSavings.
   */
  readonly balance?: IAmount;
  /**
   * The Aliases for the MonetaryAccountSavings.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The MonetaryAccountSavings's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The status of the MonetaryAccountSavings. Can be: ACTIVE, BLOCKED, CANCELLED or PENDING_REOPEN
   */
  readonly status?: string;
  /**
   * The sub-status of the MonetaryAccountSavings providing extra information regarding the status. Will be NONE for ACTIVE or PENDING_REOPEN, COMPLETELY or ONLY_ACCEPTING_INCOMING for BLOCKED and REDEMPTION_INVOLUNTARY, REDEMPTION_VOLUNTARY or PERMANENT for CANCELLED.
   */
  readonly sub_status?: string;
  /**
   * The reason for voluntarily cancelling (closing) the MonetaryAccountSavings, can only be OTHER.
   */
  readonly reason?: string;
  /**
   * The optional free-form reason for voluntarily cancelling (closing) the MonetaryAccountSavings. Can be any user provided message.
   */
  readonly reason_description?: string;
  /**
   * The users the account will be joint with.
   */
  readonly all_co_owner?: Array<ICoOwner>;
  /**
   * The id of the User who owns the MonetaryAccountSavings.
   */
  readonly user_id?: number;
  /**
   * The profile of the account.
   */
  readonly monetary_account_profile?: IMonetaryAccountProfile;
  /**
   * The settings of the MonetaryAccountSavings.
   */
  readonly setting?: IMonetaryAccountSetting;
  /**
   * The Savings Goal set for this MonetaryAccountSavings.
   */
  readonly savings_goal?: IAmount;
  /**
   * The progress in percentages for the Savings Goal set for this MonetaryAccountSavings.
   */
  readonly savings_goal_progress?: number;
  /**
   * The id of the AutoSave.
   */
  readonly auto_save_id?: number;
  /**
   * The ids of the AutoSave.
   */
  readonly all_auto_save_id?: Array<BunqId>;
}

export interface IMonetaryAccountSavingsCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IMonetaryAccountSavings {
  /**
   * The currency of the MonetaryAccountSavings as an ISO 4217 formatted currency code.
   */
  currency: string;
  /**
   * The description of the MonetaryAccountSavings. Defaults to 'bunq account'.
   */
  description?: string;
  /**
   * The daily spending limit Amount of the MonetaryAccountSavings. Defaults to 1000 EUR. Currency must match the MonetaryAccountSavings's currency. Limited to 10000 EUR.
   */
  daily_limit?: IAmount;
  /**
   * The UUID of the Avatar of the MonetaryAccountSavings.
   */
  avatar_uuid?: string;
  /**
   * The status of the MonetaryAccountSavings. Ignored in POST requests (always set to ACTIVE) can be CANCELLED or PENDING_REOPEN in PUT requests to cancel (close) or reopen the MonetaryAccountSavings. When updating the status and/or sub_status no other fields can be updated in the same request (and vice versa).
   */
  status?: string;
  /**
   * The sub-status of the MonetaryAccountSavings providing extra information regarding the status. Should be ignored for POST requests. In case of PUT requests with status CANCELLED it can only be REDEMPTION_VOLUNTARY, while with status PENDING_REOPEN it can only be NONE. When updating the status and/or sub_status no other fields can be updated in the same request (and vice versa).
   */
  sub_status?: string;
  /**
   * The reason for voluntarily cancelling (closing) the MonetaryAccountSavings, can only be OTHER. Should only be specified if updating the status to CANCELLED.
   */
  reason?: string;
  /**
   * The optional free-form reason for voluntarily cancelling (closing) the MonetaryAccountSavings. Can be any user provided message. Should only be specified if updating the status to CANCELLED.
   */
  reason_description?: string;
  /**
   * The users the account will be joint with.
   */
  all_co_owner?: Array<ICoOwner>;
  /**
   * The settings of the MonetaryAccountSavings.
   */
  setting?: IMonetaryAccountSetting;
  /**
   * The Savings Goal set for this MonetaryAccountSavings.
   */
  savings_goal?: IAmount;
}

export interface IMonetaryAccountRead {
  /**
   *
   */
  readonly MonetaryAccountBank?: IMonetaryAccountBank;
  /**
   *
   */
  readonly MonetaryAccountJoint?: IMonetaryAccountJoint;
  /**
   *
   */
  readonly MonetaryAccountLight?: IMonetaryAccountLight;
  /**
   *
   */
  readonly MonetaryAccountSavings?: IMonetaryAccountSavings;
}

export interface IMonetaryAccountProfileFill {
  /**
   * The status of the profile.
   */
  status?: string;
  /**
   * The goal balance.
   */
  balance_preferred?: IAmount;
  /**
   * The low threshold balance.
   */
  balance_threshold_low?: IAmount;
  /**
   * The method used to fill the monetary account. Currently only iDEAL is supported, and it is the default one.
   */
  method_fill?: string;
  /**
   * The bank the fill is supposed to happen from, with BIC and bank name.
   */
  issuer?: IIssuer;
}

export interface IMonetaryAccountProfileDrain {
  /**
   * The status of the profile.
   */
  status?: string;
  /**
   * The goal balance.
   */
  balance_preferred?: IAmount;
  /**
   * The high threshold balance.
   */
  balance_threshold_high?: IAmount;
  /**
   * The savings monetary account.
   */
  savings_account_alias?: ILabelMonetaryAccount;
}

export interface IMonetaryAccountProfile {
  /**
   * The profile settings for triggering the fill of a monetary account.
   */
  profile_fill?: IMonetaryAccountProfileFill;
  /**
   * The profile settings for moving excesses to a savings account
   */
  profile_drain?: IMonetaryAccountProfileDrain;
}

export interface IMonetaryAccountListing {
  /**
   *
   */
  readonly MonetaryAccountBank?: IMonetaryAccountBank;
  /**
   *
   */
  readonly MonetaryAccountJoint?: IMonetaryAccountJoint;
  /**
   *
   */
  readonly MonetaryAccountLight?: IMonetaryAccountLight;
  /**
   *
   */
  readonly MonetaryAccountSavings?: IMonetaryAccountSavings;
}

export interface IMonetaryAccountLight {
  /**
   * The currency of the MonetaryAccountLight as an ISO 4217 formatted currency code.
   */
  currency?: string;
  /**
   * The description of the MonetaryAccountLight. Defaults to 'bunq account'.
   */
  description?: string;
  /**
   * The daily spending limit Amount of the MonetaryAccountLight. Defaults to 1000 EUR. Currency must match the MonetaryAccountLight's currency. Limited to 10000 EUR.
   */
  daily_limit?: IAmount;
  /**
   * The UUID of the Avatar of the MonetaryAccountLight.
   */
  avatar_uuid?: string;
  /**
   * The status of the MonetaryAccountLight. Can be: ACTIVE, BLOCKED, CANCELLED or PENDING_REOPEN
   */
  status?: string;
  /**
   * The sub-status of the MonetaryAccountLight providing extra information regarding the status. Will be NONE for ACTIVE or PENDING_REOPEN, COMPLETELY or ONLY_ACCEPTING_INCOMING for BLOCKED and REDEMPTION_INVOLUNTARY, REDEMPTION_VOLUNTARY or PERMANENT for CANCELLED.
   */
  sub_status?: string;
  /**
   * The reason for voluntarily cancelling (closing) the MonetaryAccountBank, can only be OTHER.
   */
  reason?: string;
  /**
   * The optional free-form reason for voluntarily cancelling (closing) the MonetaryAccountBank. Can be any user provided message.
   */
  reason_description?: string;
  /**
   * The settings of the MonetaryAccountLight.
   */
  setting?: IMonetaryAccountSetting;
  /**
   * The id of the MonetaryAccountLight.
   */
  readonly id?: number;
  /**
   * The timestamp of the MonetaryAccountLight's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the MonetaryAccountLight's last update.
   */
  readonly updated?: string;
  /**
   * The Avatar of the MonetaryAccountLight.
   */
  readonly avatar?: IAvatar;
  /**
   * The current available balance Amount of the MonetaryAccountLight.
   */
  readonly balance?: IAmount;
  /**
   * The current real balance Amount of the MonetaryAccountLight.
   */
  readonly balance_real?: IAmount;
  /**
   * The Aliases for the MonetaryAccountLight.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The MonetaryAccountLight's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The id of the User who owns the MonetaryAccountLight.
   */
  readonly user_id?: number;
  /**
   * The maximum balance Amount of the MonetaryAccountLight.
   */
  readonly balance_maximum?: IAmount;
  /**
   * The amount of the monthly budget used.
   */
  readonly budget_month_used?: IAmount;
  /**
   * The total amount of the monthly budget.
   */
  readonly budget_month_maximum?: IAmount;
  /**
   * The amount of the yearly budget used.
   */
  readonly budget_year_used?: IAmount;
  /**
   * The total amount of the yearly budget.
   */
  readonly budget_year_maximum?: IAmount;
  /**
   * The amount of the yearly withdrawal budget used.
   */
  readonly budget_withdrawal_year_used?: IAmount;
  /**
   * The total amount of the yearly withdrawal budget.
   */
  readonly budget_withdrawal_year_maximum?: IAmount;
}

export interface IMonetaryAccountJointUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IMonetaryAccountJointRead {
  /**
   * The id of the MonetaryAccountJoint.
   */
  readonly id?: number;
  /**
   * The timestamp of the MonetaryAccountJoint's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the MonetaryAccountJoint's last update.
   */
  readonly updated?: string;
  /**
   * The Avatar of the MonetaryAccountJoint.
   */
  readonly avatar?: IAvatar;
  /**
   * The currency of the MonetaryAccountJoint as an ISO 4217 formatted currency code.
   */
  readonly currency?: string;
  /**
   * The description of the MonetaryAccountJoint. Defaults to 'bunq account'.
   */
  readonly description?: string;
  /**
   * The daily spending limit Amount of the MonetaryAccountJoint. Defaults to 1000 EUR. Currency must match the MonetaryAccountJoint's currency. Limited to 10000 EUR.
   */
  readonly daily_limit?: IAmount;
  /**
   * The maximum Amount the MonetaryAccountJoint can be 'in the red'.
   */
  readonly overdraft_limit?: IAmount;
  /**
   * The current available balance Amount of the MonetaryAccountJoint.
   */
  readonly balance?: IAmount;
  /**
   * The Aliases for the MonetaryAccountJoint.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The MonetaryAccountJoint's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The status of the MonetaryAccountJoint. Can be: ACTIVE, BLOCKED, CANCELLED or PENDING_REOPEN
   */
  readonly status?: string;
  /**
   * The sub-status of the MonetaryAccountJoint providing extra information regarding the status. Will be NONE for ACTIVE or PENDING_REOPEN, COMPLETELY or ONLY_ACCEPTING_INCOMING for BLOCKED and REDEMPTION_INVOLUNTARY, REDEMPTION_VOLUNTARY or PERMANENT for CANCELLED.
   */
  readonly sub_status?: string;
  /**
   * The reason for voluntarily cancelling (closing) the MonetaryAccountJoint, can only be OTHER.
   */
  readonly reason?: string;
  /**
   * The optional free-form reason for voluntarily cancelling (closing) the MonetaryAccountJoint. Can be any user provided message.
   */
  readonly reason_description?: string;
  /**
   * The users the account will be joint with.
   */
  readonly all_co_owner?: Array<ICoOwner>;
  /**
   * The id of the User who owns the MonetaryAccountJoint.
   */
  readonly user_id?: number;
  /**
   * The profile of the account.
   */
  readonly monetary_account_profile?: IMonetaryAccountProfile;
  /**
   * The settings of the MonetaryAccountJoint.
   */
  readonly setting?: IMonetaryAccountSetting;
  /**
   * The id of the AutoSave.
   */
  readonly auto_save_id?: number;
  /**
   * The ids of the AutoSave.
   */
  readonly all_auto_save_id?: Array<BunqId>;
}

export interface IMonetaryAccountJointListing {
  /**
   * The id of the MonetaryAccountJoint.
   */
  readonly id?: number;
  /**
   * The timestamp of the MonetaryAccountJoint's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the MonetaryAccountJoint's last update.
   */
  readonly updated?: string;
  /**
   * The Avatar of the MonetaryAccountJoint.
   */
  readonly avatar?: IAvatar;
  /**
   * The currency of the MonetaryAccountJoint as an ISO 4217 formatted currency code.
   */
  readonly currency?: string;
  /**
   * The description of the MonetaryAccountJoint. Defaults to 'bunq account'.
   */
  readonly description?: string;
  /**
   * The daily spending limit Amount of the MonetaryAccountJoint. Defaults to 1000 EUR. Currency must match the MonetaryAccountJoint's currency. Limited to 10000 EUR.
   */
  readonly daily_limit?: IAmount;
  /**
   * The maximum Amount the MonetaryAccountJoint can be 'in the red'.
   */
  readonly overdraft_limit?: IAmount;
  /**
   * The current available balance Amount of the MonetaryAccountJoint.
   */
  readonly balance?: IAmount;
  /**
   * The Aliases for the MonetaryAccountJoint.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The MonetaryAccountJoint's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The status of the MonetaryAccountJoint. Can be: ACTIVE, BLOCKED, CANCELLED or PENDING_REOPEN
   */
  readonly status?: string;
  /**
   * The sub-status of the MonetaryAccountJoint providing extra information regarding the status. Will be NONE for ACTIVE or PENDING_REOPEN, COMPLETELY or ONLY_ACCEPTING_INCOMING for BLOCKED and REDEMPTION_INVOLUNTARY, REDEMPTION_VOLUNTARY or PERMANENT for CANCELLED.
   */
  readonly sub_status?: string;
  /**
   * The reason for voluntarily cancelling (closing) the MonetaryAccountJoint, can only be OTHER.
   */
  readonly reason?: string;
  /**
   * The optional free-form reason for voluntarily cancelling (closing) the MonetaryAccountJoint. Can be any user provided message.
   */
  readonly reason_description?: string;
  /**
   * The users the account will be joint with.
   */
  readonly all_co_owner?: Array<ICoOwner>;
  /**
   * The id of the User who owns the MonetaryAccountJoint.
   */
  readonly user_id?: number;
  /**
   * The profile of the account.
   */
  readonly monetary_account_profile?: IMonetaryAccountProfile;
  /**
   * The settings of the MonetaryAccountJoint.
   */
  readonly setting?: IMonetaryAccountSetting;
  /**
   * The id of the AutoSave.
   */
  readonly auto_save_id?: number;
  /**
   * The ids of the AutoSave.
   */
  readonly all_auto_save_id?: Array<BunqId>;
}

export interface IMonetaryAccountJointCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IMonetaryAccountJoint {
  /**
   * The currency of the MonetaryAccountJoint as an ISO 4217 formatted currency code.
   */
  currency: string;
  /**
   * The description of the MonetaryAccountJoint. Defaults to 'bunq account'.
   */
  description?: string;
  /**
   * The daily spending limit Amount of the MonetaryAccountJoint. Defaults to 1000 EUR. Currency must match the MonetaryAccountJoint's currency. Limited to 10000 EUR.
   */
  daily_limit?: IAmount;
  /**
   * The maximum Amount the MonetaryAccountJoint can be 'in the red'. Must be 0 EUR or omitted.
   */
  overdraft_limit?: IAmount;
  /**
   * The Aliases to add to MonetaryAccountJoint. Must all be confirmed first. Can mostly be ignored.
   */
  alias?: Array<IPointer>;
  /**
   * The UUID of the Avatar of the MonetaryAccountJoint.
   */
  avatar_uuid?: string;
  /**
   * The status of the MonetaryAccountJoint. Ignored in POST requests (always set to ACTIVE) can be CANCELLED or PENDING_REOPEN in PUT requests to cancel (close) or reopen the MonetaryAccountJoint. When updating the status and/or sub_status no other fields can be updated in the same request (and vice versa).
   */
  status?: string;
  /**
   * The sub-status of the MonetaryAccountJoint providing extra information regarding the status. Should be ignored for POST requests. In case of PUT requests with status CANCELLED it can only be REDEMPTION_VOLUNTARY, while with status PENDING_REOPEN it can only be NONE. When updating the status and/or sub_status no other fields can be updated in the same request (and vice versa).
   */
  sub_status?: string;
  /**
   * The reason for voluntarily cancelling (closing) the MonetaryAccountJoint, can only be OTHER. Should only be specified if updating the status to CANCELLED.
   */
  reason?: string;
  /**
   * The optional free-form reason for voluntarily cancelling (closing) the MonetaryAccountJoint. Can be any user provided message. Should only be specified if updating the status to CANCELLED.
   */
  reason_description?: string;
  /**
   * The users the account will be joint with.
   */
  all_co_owner: Array<ICoOwner>;
  /**
   * The settings of the MonetaryAccountJoint.
   */
  setting?: IMonetaryAccountSetting;
}

export interface IMonetaryAccountBankUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IMonetaryAccountBankRead {
  /**
   * The id of the MonetaryAccountBank.
   */
  readonly id?: number;
  /**
   * The timestamp of the MonetaryAccountBank's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the MonetaryAccountBank's last update.
   */
  readonly updated?: string;
  /**
   * The Avatar of the MonetaryAccountBank.
   */
  readonly avatar?: IAvatar;
  /**
   * The currency of the MonetaryAccountBank as an ISO 4217 formatted currency code.
   */
  readonly currency?: string;
  /**
   * The description of the MonetaryAccountBank. Defaults to 'bunq account'.
   */
  readonly description?: string;
  /**
   * The daily spending limit Amount of the MonetaryAccountBank. Defaults to 1000 EUR. Currency must match the MonetaryAccountBank's currency. Limited to 10000 EUR.
   */
  readonly daily_limit?: IAmount;
  /**
   * The maximum Amount the MonetaryAccountBank can be 'in the red'.
   */
  readonly overdraft_limit?: IAmount;
  /**
   * The current available balance Amount of the MonetaryAccountBank.
   */
  readonly balance?: IAmount;
  /**
   * The Aliases for the MonetaryAccountBank.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The MonetaryAccountBank's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The status of the MonetaryAccountBank. Can be: ACTIVE, BLOCKED, CANCELLED or PENDING_REOPEN
   */
  readonly status?: string;
  /**
   * The sub-status of the MonetaryAccountBank providing extra information regarding the status. Will be NONE for ACTIVE or PENDING_REOPEN, COMPLETELY or ONLY_ACCEPTING_INCOMING for BLOCKED and REDEMPTION_INVOLUNTARY, REDEMPTION_VOLUNTARY or PERMANENT for CANCELLED.
   */
  readonly sub_status?: string;
  /**
   * The reason for voluntarily cancelling (closing) the MonetaryAccountBank, can only be OTHER.
   */
  readonly reason?: string;
  /**
   * The optional free-form reason for voluntarily cancelling (closing) the MonetaryAccountBank. Can be any user provided message.
   */
  readonly reason_description?: string;
  /**
   * The id of the User who owns the MonetaryAccountBank.
   */
  readonly user_id?: number;
  /**
   * The profile of the account.
   */
  readonly monetary_account_profile?: IMonetaryAccountProfile;
  /**
   * The legal name of the user / company using this monetary account.
   */
  readonly display_name?: string;
  /**
   * The settings of the MonetaryAccountBank.
   */
  readonly setting?: IMonetaryAccountSetting;
  /**
   * The id of the AutoSave.
   */
  readonly auto_save_id?: number;
  /**
   * The ids of the AutoSave.
   */
  readonly all_auto_save_id?: Array<BunqId>;
}

export interface IMonetaryAccountBankListing {
  /**
   * The id of the MonetaryAccountBank.
   */
  readonly id?: number;
  /**
   * The timestamp of the MonetaryAccountBank's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the MonetaryAccountBank's last update.
   */
  readonly updated?: string;
  /**
   * The Avatar of the MonetaryAccountBank.
   */
  readonly avatar?: IAvatar;
  /**
   * The currency of the MonetaryAccountBank as an ISO 4217 formatted currency code.
   */
  readonly currency?: string;
  /**
   * The description of the MonetaryAccountBank. Defaults to 'bunq account'.
   */
  readonly description?: string;
  /**
   * The daily spending limit Amount of the MonetaryAccountBank. Defaults to 1000 EUR. Currency must match the MonetaryAccountBank's currency. Limited to 10000 EUR.
   */
  readonly daily_limit?: IAmount;
  /**
   * The maximum Amount the MonetaryAccountBank can be 'in the red'.
   */
  readonly overdraft_limit?: IAmount;
  /**
   * The current available balance Amount of the MonetaryAccountBank.
   */
  readonly balance?: IAmount;
  /**
   * The Aliases for the MonetaryAccountBank.
   */
  readonly alias?: Array<IPointer>;
  /**
   * The MonetaryAccountBank's public UUID.
   */
  readonly public_uuid?: string;
  /**
   * The status of the MonetaryAccountBank. Can be: ACTIVE, BLOCKED, CANCELLED or PENDING_REOPEN
   */
  readonly status?: string;
  /**
   * The sub-status of the MonetaryAccountBank providing extra information regarding the status. Will be NONE for ACTIVE or PENDING_REOPEN, COMPLETELY or ONLY_ACCEPTING_INCOMING for BLOCKED and REDEMPTION_INVOLUNTARY, REDEMPTION_VOLUNTARY or PERMANENT for CANCELLED.
   */
  readonly sub_status?: string;
  /**
   * The reason for voluntarily cancelling (closing) the MonetaryAccountBank, can only be OTHER.
   */
  readonly reason?: string;
  /**
   * The optional free-form reason for voluntarily cancelling (closing) the MonetaryAccountBank. Can be any user provided message.
   */
  readonly reason_description?: string;
  /**
   * The id of the User who owns the MonetaryAccountBank.
   */
  readonly user_id?: number;
  /**
   * The profile of the account.
   */
  readonly monetary_account_profile?: IMonetaryAccountProfile;
  /**
   * The legal name of the user / company using this monetary account.
   */
  readonly display_name?: string;
  /**
   * The settings of the MonetaryAccountBank.
   */
  readonly setting?: IMonetaryAccountSetting;
  /**
   * The id of the AutoSave.
   */
  readonly auto_save_id?: number;
  /**
   * The ids of the AutoSave.
   */
  readonly all_auto_save_id?: Array<BunqId>;
}

export interface IMonetaryAccountBankCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IMonetaryAccountBank {
  /**
   * The currency of the MonetaryAccountBank as an ISO 4217 formatted currency code.
   */
  currency: string;
  /**
   * The description of the MonetaryAccountBank. Defaults to 'bunq account'.
   */
  description?: string;
  /**
   * The daily spending limit Amount of the MonetaryAccountBank. Defaults to 1000 EUR. Currency must match the MonetaryAccountBank's currency. Limited to 10000 EUR.
   */
  daily_limit?: IAmount;
  /**
   * The UUID of the Avatar of the MonetaryAccountBank.
   */
  avatar_uuid?: string;
  /**
   * The status of the MonetaryAccountBank. Ignored in POST requests (always set to ACTIVE) can be CANCELLED or PENDING_REOPEN in PUT requests to cancel (close) or reopen the MonetaryAccountBank. When updating the status and/or sub_status no other fields can be updated in the same request (and vice versa).
   */
  status?: string;
  /**
   * The sub-status of the MonetaryAccountBank providing extra information regarding the status. Should be ignored for POST requests. In case of PUT requests with status CANCELLED it can only be REDEMPTION_VOLUNTARY, while with status PENDING_REOPEN it can only be NONE. When updating the status and/or sub_status no other fields can be updated in the same request (and vice versa).
   */
  sub_status?: string;
  /**
   * The reason for voluntarily cancelling (closing) the MonetaryAccountBank, can only be OTHER. Should only be specified if updating the status to CANCELLED.
   */
  reason?: string;
  /**
   * The optional free-form reason for voluntarily cancelling (closing) the MonetaryAccountBank. Can be any user provided message. Should only be specified if updating the status to CANCELLED.
   */
  reason_description?: string;
  /**
   * The legal name of the user / company using this monetary account.
   */
  display_name?: string;
  /**
   * The settings of the MonetaryAccountBank.
   */
  setting?: IMonetaryAccountSetting;
}

export interface IMasterCardActionRead {
  /**
   * The id of the MastercardAction.
   */
  readonly id?: number;
  /**
   * The id of the monetary account this action links to.
   */
  readonly monetary_account_id?: number;
  /**
   * The id of the card this action links to.
   */
  readonly card_id?: number;
  /**
   * The amount of the transaction in local currency.
   */
  readonly amount_local?: IAmount;
  /**
   * The amount of the transaction in local currency.
   */
  readonly amount_converted?: IAmount;
  /**
   * The amount of the transaction in the monetary account's currency.
   */
  readonly amount_billing?: IAmount;
  /**
   * The original amount in local currency.
   */
  readonly amount_original_local?: IAmount;
  /**
   * The original amount in the monetary account's currency.
   */
  readonly amount_original_billing?: IAmount;
  /**
   * The fee amount as charged by the merchant, if applicable.
   */
  readonly amount_fee?: IAmount;
  /**
   * The response code by which authorised transaction can be identified as authorised by bunq.
   */
  readonly card_authorisation_id_response?: string;
  /**
   * Why the transaction was denied, if it was denied, or just ALLOWED.
   */
  readonly decision?: string;
  /**
   * The payment status of the transaction. For example PAYMENT_SUCCESSFUL, for a successful payment.
   */
  readonly payment_status?: string;
  /**
   * Empty if allowed, otherwise a textual explanation of why it was denied.
   */
  readonly decision_description?: string;
  /**
   * Empty if allowed, otherwise a textual explanation of why it was denied in user's language.
   */
  readonly decision_description_translated?: string;
  /**
   * The description for this transaction to display.
   */
  readonly description?: string;
  /**
   * The status in the authorisation process.
   */
  readonly authorisation_status?: string;
  /**
   * The type of transaction that was delivered using the card.
   */
  readonly authorisation_type?: string;
  /**
   * The type of entry mode the user used. Can be 'ATM', 'ICC', 'MAGNETIC_STRIPE' or 'E_COMMERCE'.
   */
  readonly pan_entry_mode_user?: string;
  /**
   * The setlement status in the authorisation process.
   */
  readonly settlement_status?: string;
  /**
   * The clearing status of the authorisation. Can be 'PENDING', 'FIRST_PRESENTMENT_COMPLETE' or 'REFUND_LENIENCY'.
   */
  readonly clearing_status?: string;
  /**
   * The maturity date.
   */
  readonly maturity_date?: string;
  /**
   * The city where the message originates from as announced by the terminal.
   */
  readonly city?: string;
  /**
   * The monetary account label of the account that this action is created for.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The monetary account label of the counterparty.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The label of the card.
   */
  readonly label_card?: ILabelCard;
  /**
   * If this is a tokenisation action, this shows the status of the token.
   */
  readonly token_status?: string;
  /**
   * If this is a reservation, the moment the reservation will expire.
   */
  readonly reservation_expiry_time?: string;
  /**
   * The time when the processing of the clearing is expired, refunding the authorisation.
   */
  readonly clearing_expiry_time?: string;
  /**
   * The type of the limit applied to validate if this MasterCardAction was within the spending limits. The returned string matches the limit types as defined in the card endpoint.
   */
  readonly applied_limit?: string;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The secure code id for this mastercard action or null.
   */
  readonly secure_code_id?: number;
  /**
   * The ID of the wallet provider as defined by MasterCard. 420 = bunq Android app with Tap&Pay; 103 = Apple Pay.
   */
  readonly wallet_provider_id?: string;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface IMasterCardActionListing {
  /**
   * The id of the MastercardAction.
   */
  readonly id?: number;
  /**
   * The id of the monetary account this action links to.
   */
  readonly monetary_account_id?: number;
  /**
   * The id of the card this action links to.
   */
  readonly card_id?: number;
  /**
   * The amount of the transaction in local currency.
   */
  readonly amount_local?: IAmount;
  /**
   * The amount of the transaction in local currency.
   */
  readonly amount_converted?: IAmount;
  /**
   * The amount of the transaction in the monetary account's currency.
   */
  readonly amount_billing?: IAmount;
  /**
   * The original amount in local currency.
   */
  readonly amount_original_local?: IAmount;
  /**
   * The original amount in the monetary account's currency.
   */
  readonly amount_original_billing?: IAmount;
  /**
   * The fee amount as charged by the merchant, if applicable.
   */
  readonly amount_fee?: IAmount;
  /**
   * The response code by which authorised transaction can be identified as authorised by bunq.
   */
  readonly card_authorisation_id_response?: string;
  /**
   * Why the transaction was denied, if it was denied, or just ALLOWED.
   */
  readonly decision?: string;
  /**
   * The payment status of the transaction. For example PAYMENT_SUCCESSFUL, for a successful payment.
   */
  readonly payment_status?: string;
  /**
   * Empty if allowed, otherwise a textual explanation of why it was denied.
   */
  readonly decision_description?: string;
  /**
   * Empty if allowed, otherwise a textual explanation of why it was denied in user's language.
   */
  readonly decision_description_translated?: string;
  /**
   * The description for this transaction to display.
   */
  readonly description?: string;
  /**
   * The status in the authorisation process.
   */
  readonly authorisation_status?: string;
  /**
   * The type of transaction that was delivered using the card.
   */
  readonly authorisation_type?: string;
  /**
   * The type of entry mode the user used. Can be 'ATM', 'ICC', 'MAGNETIC_STRIPE' or 'E_COMMERCE'.
   */
  readonly pan_entry_mode_user?: string;
  /**
   * The setlement status in the authorisation process.
   */
  readonly settlement_status?: string;
  /**
   * The clearing status of the authorisation. Can be 'PENDING', 'FIRST_PRESENTMENT_COMPLETE' or 'REFUND_LENIENCY'.
   */
  readonly clearing_status?: string;
  /**
   * The maturity date.
   */
  readonly maturity_date?: string;
  /**
   * The city where the message originates from as announced by the terminal.
   */
  readonly city?: string;
  /**
   * The monetary account label of the account that this action is created for.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The monetary account label of the counterparty.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The label of the card.
   */
  readonly label_card?: ILabelCard;
  /**
   * If this is a tokenisation action, this shows the status of the token.
   */
  readonly token_status?: string;
  /**
   * If this is a reservation, the moment the reservation will expire.
   */
  readonly reservation_expiry_time?: string;
  /**
   * The time when the processing of the clearing is expired, refunding the authorisation.
   */
  readonly clearing_expiry_time?: string;
  /**
   * The type of the limit applied to validate if this MasterCardAction was within the spending limits. The returned string matches the limit types as defined in the card endpoint.
   */
  readonly applied_limit?: string;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The secure code id for this mastercard action or null.
   */
  readonly secure_code_id?: number;
  /**
   * The ID of the wallet provider as defined by MasterCard. 420 = bunq Android app with Tap&Pay; 103 = Apple Pay.
   */
  readonly wallet_provider_id?: string;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface IMasterCardAction {
  /**
   * The id of the MastercardAction.
   */
  readonly id?: number;
  /**
   * The id of the monetary account this action links to.
   */
  readonly monetary_account_id?: number;
  /**
   * The id of the card this action links to.
   */
  readonly card_id?: number;
  /**
   * The amount of the transaction in local currency.
   */
  readonly amount_local?: IAmount;
  /**
   * The amount of the transaction in local currency.
   */
  readonly amount_converted?: IAmount;
  /**
   * The amount of the transaction in the monetary account's currency.
   */
  readonly amount_billing?: IAmount;
  /**
   * The original amount in local currency.
   */
  readonly amount_original_local?: IAmount;
  /**
   * The original amount in the monetary account's currency.
   */
  readonly amount_original_billing?: IAmount;
  /**
   * The fee amount as charged by the merchant, if applicable.
   */
  readonly amount_fee?: IAmount;
  /**
   * The response code by which authorised transaction can be identified as authorised by bunq.
   */
  readonly card_authorisation_id_response?: string;
  /**
   * Why the transaction was denied, if it was denied, or just ALLOWED.
   */
  readonly decision?: string;
  /**
   * The payment status of the transaction. For example PAYMENT_SUCCESSFUL, for a successful payment.
   */
  readonly payment_status?: string;
  /**
   * Empty if allowed, otherwise a textual explanation of why it was denied.
   */
  readonly decision_description?: string;
  /**
   * Empty if allowed, otherwise a textual explanation of why it was denied in user's language.
   */
  readonly decision_description_translated?: string;
  /**
   * The description for this transaction to display.
   */
  readonly description?: string;
  /**
   * The status in the authorisation process.
   */
  readonly authorisation_status?: string;
  /**
   * The type of transaction that was delivered using the card.
   */
  readonly authorisation_type?: string;
  /**
   * The type of entry mode the user used. Can be 'ATM', 'ICC', 'MAGNETIC_STRIPE' or 'E_COMMERCE'.
   */
  readonly pan_entry_mode_user?: string;
  /**
   * The setlement status in the authorisation process.
   */
  readonly settlement_status?: string;
  /**
   * The clearing status of the authorisation. Can be 'PENDING', 'FIRST_PRESENTMENT_COMPLETE' or 'REFUND_LENIENCY'.
   */
  readonly clearing_status?: string;
  /**
   * The maturity date.
   */
  readonly maturity_date?: string;
  /**
   * The city where the message originates from as announced by the terminal.
   */
  readonly city?: string;
  /**
   * The monetary account label of the account that this action is created for.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The monetary account label of the counterparty.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The label of the card.
   */
  readonly label_card?: ILabelCard;
  /**
   * If this is a tokenisation action, this shows the status of the token.
   */
  readonly token_status?: string;
  /**
   * If this is a reservation, the moment the reservation will expire.
   */
  readonly reservation_expiry_time?: string;
  /**
   * The time when the processing of the clearing is expired, refunding the authorisation.
   */
  readonly clearing_expiry_time?: string;
  /**
   * The type of the limit applied to validate if this MasterCardAction was within the spending limits. The returned string matches the limit types as defined in the card endpoint.
   */
  readonly applied_limit?: string;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
  /**
   * The secure code id for this mastercard action or null.
   */
  readonly secure_code_id?: number;
  /**
   * The ID of the wallet provider as defined by MasterCard. 420 = bunq Android app with Tap&Pay; 103 = Apple Pay.
   */
  readonly wallet_provider_id?: string;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface ILabelUser {
  /**
   * The public UUID of the label-user.
   */
  uuid?: string;
  /**
   * The name to be displayed for this user, as it was given on the request.
   */
  display_name?: string;
  /**
   * The country of the user. 000 stands for "unknown"
   */
  country?: string;
  /**
   * The current avatar of the user.
   */
  readonly avatar?: IAvatar;
  /**
   * The current nickname of the user.
   */
  readonly public_nick_name?: string;
}

export interface ILabelMonetaryAccount {
  /**
   * The IBAN of the monetary account.
   */
  readonly iban?: string;
  /**
   * The name to display with this monetary account.
   */
  readonly display_name?: string;
  /**
   * The avatar of the monetary account.
   */
  readonly avatar?: IAvatar;
  /**
   * The user this monetary account belongs to.
   */
  readonly label_user?: ILabelUser;
  /**
   * The country of the user. Formatted as a ISO 3166-1 alpha-2 country code.
   */
  readonly country?: string;
  /**
   * Bunq.me pointer with type and value.
   */
  readonly bunq_me?: IPointer;
  /**
   * Whether or not the monetary account is light.
   */
  readonly is_light?: boolean;
  /**
   * The BIC used for a SWIFT payment.
   */
  readonly swift_bic?: string;
  /**
   * The account number used for a SWIFT payment. May or may not be an IBAN.
   */
  readonly swift_account_number?: string;
  /**
   * The account number used for a Transferwise payment. May or may not be an IBAN.
   */
  readonly transferwise_account_number?: string;
  /**
   * The bank code used for a Transferwise payment. May or may not be a BIC.
   */
  readonly transferwise_bank_code?: string;
  /**
   * The merchant category code.
   */
  readonly merchant_category_code?: string;
}

export interface ILabelCard {
  /**
   * The public UUID.
   */
  readonly uuid?: string;
  /**
   * The type of the card.
   */
  readonly type?: string;
  /**
   * The second line on the card.
   */
  readonly second_line?: string;
  /**
   * The date this card will expire.
   */
  readonly expiry_date?: string;
  /**
   * The status of the card.
   */
  readonly status?: string;
  /**
   * The owner of this card.
   */
  readonly label_user?: ILabelUser;
}

export interface IIssuer {
  /**
   * The BIC code.
   */
  bic?: string;
  /**
   * The name of the bank.
   */
  name?: string;
}

export interface IInvoiceRead {
  /**
   * The id of the invoice object.
   */
  readonly id?: number;
  /**
   * The timestamp of the invoice object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the invoice object's last update.
   */
  readonly updated?: string;
  /**
   * The invoice date.
   */
  readonly invoice_date?: string;
  /**
   * The invoice number.
   */
  readonly invoice_number?: string;
  /**
   * The invoice status.
   */
  readonly status?: string;
  /**
   * The category to display to the user.
   */
  readonly category?: string;
  /**
   * The invoice item groups.
   */
  readonly group?: Array<IInvoiceItemGroup>;
  /**
   * The total discounted item price including VAT.
   */
  readonly total_vat_inclusive?: IAmount;
  /**
   * The total discounted item price excluding VAT.
   */
  readonly total_vat_exclusive?: IAmount;
  /**
   * The VAT on the total discounted item price.
   */
  readonly total_vat?: IAmount;
  /**
   * The label that's displayed to the counterparty with the invoice. Includes user.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The customer's address.
   */
  readonly address?: IAddress;
  /**
   * The label of the counterparty of the invoice. Includes user.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The company's address.
   */
  readonly counterparty_address?: IAddress;
  /**
   * The company's chamber of commerce number.
   */
  readonly chamber_of_commerce_number?: string;
  /**
   * The company's chamber of commerce number.
   */
  readonly vat_number?: string;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface IInvoiceListing {
  /**
   * The id of the invoice object.
   */
  readonly id?: number;
  /**
   * The timestamp of the invoice object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the invoice object's last update.
   */
  readonly updated?: string;
  /**
   * The invoice date.
   */
  readonly invoice_date?: string;
  /**
   * The invoice number.
   */
  readonly invoice_number?: string;
  /**
   * The invoice status.
   */
  readonly status?: string;
  /**
   * The category to display to the user.
   */
  readonly category?: string;
  /**
   * The invoice item groups.
   */
  readonly group?: Array<IInvoiceItemGroup>;
  /**
   * The total discounted item price including VAT.
   */
  readonly total_vat_inclusive?: IAmount;
  /**
   * The total discounted item price excluding VAT.
   */
  readonly total_vat_exclusive?: IAmount;
  /**
   * The VAT on the total discounted item price.
   */
  readonly total_vat?: IAmount;
  /**
   * The label that's displayed to the counterparty with the invoice. Includes user.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The customer's address.
   */
  readonly address?: IAddress;
  /**
   * The label of the counterparty of the invoice. Includes user.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The company's address.
   */
  readonly counterparty_address?: IAddress;
  /**
   * The company's chamber of commerce number.
   */
  readonly chamber_of_commerce_number?: string;
  /**
   * The company's chamber of commerce number.
   */
  readonly vat_number?: string;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface IInvoiceItemGroup {
  /**
   * The type of the invoice item group.
   */
  readonly type?: string;
  /**
   * The description of the type of the invoice item group.
   */
  readonly type_description?: string;
  /**
   * The translated description of the type of the invoice item group.
   */
  readonly type_description_translated?: string;
  /**
   * The identifier of the invoice item group.
   */
  readonly instance_description?: string;
  /**
   * The unit item price excluding VAT.
   */
  readonly product_vat_exclusive?: IAmount;
  /**
   * The unit item price including VAT.
   */
  readonly product_vat_inclusive?: IAmount;
  /**
   * The invoice items in the group.
   */
  readonly item?: Array<IInvoiceItem>;
}

export interface IInvoiceItem {
  /**
   * The billing date of the item.
   */
  readonly billing_date?: string;
  /**
   * The price description.
   */
  readonly type_description?: string;
  /**
   * The translated price description.
   */
  readonly type_description_translated?: string;
  /**
   * The unit item price excluding VAT.
   */
  readonly unit_vat_exclusive?: IAmount;
  /**
   * The unit item price including VAT.
   */
  readonly unit_vat_inclusive?: IAmount;
  /**
   * The VAT tax fraction.
   */
  readonly vat?: number;
  /**
   * The number of items priced.
   */
  readonly quantity?: number;
  /**
   * The item price excluding VAT.
   */
  readonly total_vat_exclusive?: IAmount;
  /**
   * The item price including VAT.
   */
  readonly total_vat_inclusive?: IAmount;
}

export interface IInvoiceExportPdfContentListing {}

export interface IInvoiceByUserRead {
  /**
   * The id of the invoice object.
   */
  readonly id?: number;
  /**
   * The timestamp of the invoice object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the invoice object's last update.
   */
  readonly updated?: string;
  /**
   * The invoice date.
   */
  readonly invoice_date?: string;
  /**
   * The invoice number.
   */
  readonly invoice_number?: string;
  /**
   * The invoice status.
   */
  readonly status?: string;
  /**
   * The invoice item groups.
   */
  readonly group?: Array<IInvoiceItemGroup>;
  /**
   * The total discounted item price including VAT.
   */
  readonly total_vat_inclusive?: IAmount;
  /**
   * The total discounted item price excluding VAT.
   */
  readonly total_vat_exclusive?: IAmount;
  /**
   * The VAT on the total discounted item price.
   */
  readonly total_vat?: IAmount;
  /**
   * The label that's displayed to the counterparty with the invoice. Includes user.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The customer's address.
   */
  readonly address?: IAddress;
  /**
   * The label of the counterparty of the invoice. Includes user.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The company's address.
   */
  readonly counterparty_address?: IAddress;
  /**
   * The company's chamber of commerce number.
   */
  readonly chamber_of_commerce_number?: string;
  /**
   * The company's chamber of commerce number.
   */
  readonly vat_number?: string;
}

export interface IInvoiceByUserListing {
  /**
   * The id of the invoice object.
   */
  readonly id?: number;
  /**
   * The timestamp of the invoice object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the invoice object's last update.
   */
  readonly updated?: string;
  /**
   * The invoice date.
   */
  readonly invoice_date?: string;
  /**
   * The invoice number.
   */
  readonly invoice_number?: string;
  /**
   * The invoice status.
   */
  readonly status?: string;
  /**
   * The invoice item groups.
   */
  readonly group?: Array<IInvoiceItemGroup>;
  /**
   * The total discounted item price including VAT.
   */
  readonly total_vat_inclusive?: IAmount;
  /**
   * The total discounted item price excluding VAT.
   */
  readonly total_vat_exclusive?: IAmount;
  /**
   * The VAT on the total discounted item price.
   */
  readonly total_vat?: IAmount;
  /**
   * The label that's displayed to the counterparty with the invoice. Includes user.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The customer's address.
   */
  readonly address?: IAddress;
  /**
   * The label of the counterparty of the invoice. Includes user.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The company's address.
   */
  readonly counterparty_address?: IAddress;
  /**
   * The company's chamber of commerce number.
   */
  readonly chamber_of_commerce_number?: string;
  /**
   * The company's chamber of commerce number.
   */
  readonly vat_number?: string;
}

export interface IInvoice {
  /**
   * The invoice status.
   */
  status?: string;
  /**
   * The description provided by the admin.
   */
  description: string;
  /**
   * The external url provided by the admin.
   */
  external_url: string;
  /**
   * The id of the invoice object.
   */
  readonly id?: number;
  /**
   * The timestamp of the invoice object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the invoice object's last update.
   */
  readonly updated?: string;
  /**
   * The invoice date.
   */
  readonly invoice_date?: string;
  /**
   * The invoice number.
   */
  readonly invoice_number?: string;
  /**
   * The category to display to the user.
   */
  readonly category?: string;
  /**
   * The invoice item groups.
   */
  readonly group?: Array<IInvoiceItemGroup>;
  /**
   * The total discounted item price including VAT.
   */
  readonly total_vat_inclusive?: IAmount;
  /**
   * The total discounted item price excluding VAT.
   */
  readonly total_vat_exclusive?: IAmount;
  /**
   * The VAT on the total discounted item price.
   */
  readonly total_vat?: IAmount;
  /**
   * The label that's displayed to the counterparty with the invoice. Includes user.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The customer's address.
   */
  readonly address?: IAddress;
  /**
   * The label of the counterparty of the invoice. Includes user.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The company's address.
   */
  readonly counterparty_address?: IAddress;
  /**
   * The company's chamber of commerce number.
   */
  readonly chamber_of_commerce_number?: string;
  /**
   * The company's chamber of commerce number.
   */
  readonly vat_number?: string;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
}

export interface IInstallationToken {
  /**
   * The id of the Token.
   */
  readonly id?: number;
  /**
   * The timestamp of the Token's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the Token's last update.
   */
  readonly updated?: string;
  /**
   * The installation token is the token the client has to provide in the "X-Bunq-Client-Authentication" header for the creation of a DeviceServer and SessionServer.
   */
  readonly token?: string;
}

export interface IInstallationServerPublicKeyListing {
  /**
   * The server's public key for this Installation.
   */
  readonly server_public_key?: string;
}

export interface IInstallationServerPublicKey {
  /**
   * The server's public key for this Installation. You should use this key to verify the "X-Bunq-Server-Signature" header for each response from the server.
   */
  readonly server_public_key?: string;
}

export interface IInstallationRead {
  /**
   * The id of the Installation as created on the server. You can use this id to request the server's public key again.
   */
  readonly id?: number;
}

export interface IInstallationListing {
  /**
   * The id of the Installation as created on the server. You can use this id to request the server's public key again.
   */
  readonly id?: number;
}

export interface IInstallationCreate {
  /**
   * The Id object of the created Installation
   */
  readonly Id?: BunqId;
  /**
   * The Token object of this Installation.
   */
  readonly Token?: IInstallationToken;
  /**
   * The ServerPublicKey object of the created Installation
   */
  readonly ServerPublicKey?: IInstallationServerPublicKey;
}

export interface IInstallation {
  /**
   * Your public key. This is the public part of the key pair that you are going to use to create value of the "X-Bunq-Client-Signature" header for all future API calls.
   */
  client_public_key: string;
}

export interface IInsightListing {
  /**
   * The category.
   */
  readonly category?: string;
  /**
   * The translated category.
   */
  readonly category_translated?: string;
  /**
   * The total amount of the transactions in the category.
   */
  readonly amount_total?: IAmount;
  /**
   * The number of the transactions in the category.
   */
  readonly number_of_transactions?: number;
}

export interface IInsightEventListing {
  /**
   * The id of the event.
   */
  readonly id?: number;
  /**
   * The timestamp of the event's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the event's last update.
   */
  readonly updated?: string;
  /**
   * The performed action. Can be: CREATE or UPDATE.
   */
  readonly action?: string;
  /**
   * The id of the user the event applied to (if it was a user event).
   */
  readonly user_id?: string;
  /**
   * The id of the monetary account the event applied to (if it was a monetary account event).
   */
  readonly monetary_account_id?: string;
  /**
   * The details of the external object the event was created for.
   */
  readonly object?: IEventObject;
  /**
   * The event status. Can be: FINALIZED or AWAITING_REPLY. An example of FINALIZED event is a payment received event, while an AWAITING_REPLY event is a request received event.
   */
  readonly status?: string;
}

export interface IImage {
  /**
   * The public UUID of the public attachment containing the image.
   */
  readonly attachment_public_uuid?: string;
  /**
   * The content-type as a MIME filetype.
   */
  readonly content_type?: string;
  /**
   * The image height in pixels.
   */
  readonly height?: number;
  /**
   * The image width in pixels.
   */
  readonly width?: number;
}

export interface IIdealMerchantTransactionRead {
  /**
   * The id of the monetary account this ideal merchant transaction links to.
   */
  readonly monetary_account_id?: number;
  /**
   * The alias of the monetary account to add money to.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The alias of the monetary account the money comes from.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * In case of a successful transaction, the amount of money that will be transferred.
   */
  readonly amount_guaranteed?: IAmount;
  /**
   * The requested amount of money to add.
   */
  readonly amount_requested?: IAmount;
  /**
   * When the transaction will expire.
   */
  readonly expiration?: string;
  /**
   * The BIC of the issuer.
   */
  readonly issuer?: string;
  /**
   * The Name of the issuer.
   */
  readonly issuer_name?: string;
  /**
   * The URL to visit to
   */
  readonly issuer_authentication_url?: string;
  /**
   * The 'purchase ID' of the iDEAL transaction.
   */
  readonly purchase_identifier?: string;
  /**
   * The status of the transaction.
   */
  readonly status?: string;
  /**
   * When the status was last updated.
   */
  readonly status_timestamp?: string;
  /**
   * The 'transaction ID' of the iDEAL transaction.
   */
  readonly transaction_identifier?: string;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
}

export interface IIdealMerchantTransactionListing {
  /**
   * The id of the monetary account this ideal merchant transaction links to.
   */
  readonly monetary_account_id?: number;
  /**
   * The alias of the monetary account to add money to.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The alias of the monetary account the money comes from.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * In case of a successful transaction, the amount of money that will be transferred.
   */
  readonly amount_guaranteed?: IAmount;
  /**
   * The requested amount of money to add.
   */
  readonly amount_requested?: IAmount;
  /**
   * When the transaction will expire.
   */
  readonly expiration?: string;
  /**
   * The BIC of the issuer.
   */
  readonly issuer?: string;
  /**
   * The Name of the issuer.
   */
  readonly issuer_name?: string;
  /**
   * The URL to visit to
   */
  readonly issuer_authentication_url?: string;
  /**
   * The 'purchase ID' of the iDEAL transaction.
   */
  readonly purchase_identifier?: string;
  /**
   * The status of the transaction.
   */
  readonly status?: string;
  /**
   * When the status was last updated.
   */
  readonly status_timestamp?: string;
  /**
   * The 'transaction ID' of the iDEAL transaction.
   */
  readonly transaction_identifier?: string;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
}

export interface IIdealMerchantTransactionCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IIdealMerchantTransaction {
  /**
   * The requested amount of money to add.
   */
  amount_requested?: IAmount;
  /**
   * The BIC of the issuer.
   */
  issuer?: string;
  /**
   * The id of the monetary account this ideal merchant transaction links to.
   */
  readonly monetary_account_id?: number;
  /**
   * The alias of the monetary account to add money to.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The alias of the monetary account the money comes from.
   */
  readonly counterparty_alias?: ILabelMonetaryAccount;
  /**
   * In case of a successful transaction, the amount of money that will be transferred.
   */
  readonly amount_guaranteed?: IAmount;
  /**
   * When the transaction will expire.
   */
  readonly expiration?: string;
  /**
   * The Name of the issuer.
   */
  readonly issuer_name?: string;
  /**
   * The URL to visit to
   */
  readonly issuer_authentication_url?: string;
  /**
   * The 'purchase ID' of the iDEAL transaction.
   */
  readonly purchase_identifier?: string;
  /**
   * The status of the transaction.
   */
  readonly status?: string;
  /**
   * When the status was last updated.
   */
  readonly status_timestamp?: string;
  /**
   * The 'transaction ID' of the iDEAL transaction.
   */
  readonly transaction_identifier?: string;
  /**
   * Whether or not chat messages are allowed.
   */
  readonly allow_chat?: boolean;
}

export interface IGeolocation {
  /**
   * The latitude for a geolocation restriction.
   */
  latitude: number;
  /**
   * The longitude for a geolocation restriction.
   */
  longitude: number;
  /**
   * The altitude for a geolocation restriction.
   */
  altitude?: number;
  /**
   * The radius for a geolocation restriction.
   */
  radius?: number;
}

export interface IFeatureAnnouncementRead {
  /**
   * The Avatar of the event overview.
   */
  readonly avatar?: IAvatar;
  /**
   * The event overview title of the feature display
   */
  readonly title?: string;
  /**
   * The event overview subtitle of the feature display
   */
  readonly sub_title?: string;
}

export interface IFeatureAnnouncement {
  /**
   * The Avatar of the event overview.
   */
  readonly avatar?: IAvatar;
  /**
   * The event overview title of the feature display
   */
  readonly title?: string;
  /**
   * The event overview subtitle of the feature display
   */
  readonly sub_title?: string;
}

export interface IExportStatementRead {
  /**
   * The id of the customer statement model.
   */
  readonly id?: number;
  /**
   * The timestamp of the statement model's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the statement model's last update.
   */
  readonly updated?: string;
  /**
   * The date from when this statement shows transactions.
   */
  readonly date_start?: string;
  /**
   * The date until which statement shows transactions.
   */
  readonly date_end?: string;
  /**
   * The status of the export.
   */
  readonly status?: string;
  /**
   * MT940 Statement number. Unique per monetary account.
   */
  readonly statement_number?: number;
  /**
   * The format of statement.
   */
  readonly statement_format?: string;
  /**
   * The regional format of a CSV statement.
   */
  readonly regional_format?: string;
  /**
   * The monetary account for which this statement was created.
   */
  readonly alias_monetary_account?: ILabelMonetaryAccount;
}

export interface IExportStatementPaymentRead {
  /**
   * The id of the single payment statement model.
   */
  readonly id?: number;
  /**
   * The timestamp of the statement model's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the statement model's last update.
   */
  readonly updated?: string;
  /**
   * The status of the export.
   */
  readonly status?: string;
}

export interface IExportStatementPaymentCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IExportStatementPaymentContentListing {}

export interface IExportStatementPayment {}

export interface IExportStatementListing {
  /**
   * The id of the customer statement model.
   */
  readonly id?: number;
  /**
   * The timestamp of the statement model's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the statement model's last update.
   */
  readonly updated?: string;
  /**
   * The date from when this statement shows transactions.
   */
  readonly date_start?: string;
  /**
   * The date until which statement shows transactions.
   */
  readonly date_end?: string;
  /**
   * The status of the export.
   */
  readonly status?: string;
  /**
   * MT940 Statement number. Unique per monetary account.
   */
  readonly statement_number?: number;
  /**
   * The format of statement.
   */
  readonly statement_format?: string;
  /**
   * The regional format of a CSV statement.
   */
  readonly regional_format?: string;
  /**
   * The monetary account for which this statement was created.
   */
  readonly alias_monetary_account?: ILabelMonetaryAccount;
}

export interface IExportStatementDelete {}

export interface IExportStatementCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IExportStatementContentListing {}

export interface IExportStatement {
  /**
   * The format type of statement. Allowed values: MT940, CSV, PDF.
   */
  statement_format: string;
  /**
   * The start date for making statements.
   */
  date_start: string;
  /**
   * The end date for making statements.
   */
  date_end: string;
  /**
   * Required for CSV exports. The regional format of the statement, can be UK_US (comma-separated) or EUROPEAN (semicolon-separated).
   */
  regional_format?: string;
  /**
   * Only for PDF exports. Includes attachments to mutations in the export, such as scanned receipts.
   */
  include_attachment?: boolean;
}

export interface IExportRibRead {
  /**
   * The id of the rib as created on the server.
   */
  readonly id?: number;
  /**
   * The timestamp of the RIB's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the RIB's last update.
   */
  readonly updated?: string;
}

export interface IExportRibListing {
  /**
   * The id of the rib as created on the server.
   */
  readonly id?: number;
  /**
   * The timestamp of the RIB's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the RIB's last update.
   */
  readonly updated?: string;
}

export interface IExportRibDelete {}

export interface IExportRibCreate {
  /**
   * The id of the rib as created on the server.
   */
  readonly id?: number;
}

export interface IExportRibContentListing {}

export interface IExportRib {}

export interface IExportAnnualOverviewRead {
  /**
   * The id of the annual overview as created on the server.
   */
  readonly id?: number;
  /**
   * The timestamp of the annual overview 's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the annual overview 's last update.
   */
  readonly updated?: string;
  /**
   * The year for which the overview is.
   */
  readonly year?: number;
  /**
   * The user to which this annual overview belongs.
   */
  readonly alias_user?: ILabelUser;
}

export interface IExportAnnualOverviewListing {
  /**
   * The id of the annual overview as created on the server.
   */
  readonly id?: number;
  /**
   * The timestamp of the annual overview 's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the annual overview 's last update.
   */
  readonly updated?: string;
  /**
   * The year for which the overview is.
   */
  readonly year?: number;
  /**
   * The user to which this annual overview belongs.
   */
  readonly alias_user?: ILabelUser;
}

export interface IExportAnnualOverviewDelete {}

export interface IExportAnnualOverviewCreate {
  /**
   * The id of the annual overview as created on the server.
   */
  readonly id?: number;
}

export interface IExportAnnualOverviewContentListing {}

export interface IExportAnnualOverview {
  /**
   * The year for which the overview is.
   */
  year: number;
}

export interface IEventRead {
  /**
   * The id of the event.
   */
  readonly id?: number;
  /**
   * The timestamp of the event's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the event's last update.
   */
  readonly updated?: string;
  /**
   * The performed action. Can be: CREATE or UPDATE.
   */
  readonly action?: string;
  /**
   * The id of the user the event applied to (if it was a user event).
   */
  readonly user_id?: string;
  /**
   * The id of the monetary account the event applied to (if it was a monetary account event).
   */
  readonly monetary_account_id?: string;
  /**
   * The details of the external object the event was created for.
   */
  readonly object?: IEventObject;
  /**
   * The event status. Can be: FINALIZED or AWAITING_REPLY. An example of FINALIZED event is a payment received event, while an AWAITING_REPLY event is a request received event.
   */
  readonly status?: string;
}

export interface IEventObject {
  /**
   *
   */
  readonly BunqMeTab?: IBunqMeTab;
  /**
   *
   */
  readonly BunqMeTabResultResponse?: IBunqMeTabResultResponse;
  /**
   *
   */
  readonly BunqMeFundraiserResult?: IBunqMeFundraiserResult;
  /**
   *
   */
  readonly Card?: ICard;
  /**
   *
   */
  readonly CardDebit?: ICardDebit;
  /**
   *
   */
  readonly DraftPayment?: IDraftPayment;
  /**
   *
   */
  readonly FeatureAnnouncement?: IFeatureAnnouncement;
  /**
   *
   */
  readonly IdealMerchantTransaction?: IIdealMerchantTransaction;
  /**
   *
   */
  readonly Invoice?: IInvoice;
  /**
   *
   */
  readonly ScheduledPayment?: ISchedulePayment;
  /**
   *
   */
  readonly ScheduledPaymentBatch?: ISchedulePaymentBatch;
  /**
   *
   */
  readonly ScheduledInstance?: IScheduleInstance;
  /**
   *
   */
  readonly MasterCardAction?: IMasterCardAction;
  /**
   *
   */
  readonly BankSwitchServiceNetherlandsIncomingPayment?: IBankSwitchServiceNetherlandsIncomingPayment;
  /**
   *
   */
  readonly Payment?: IPayment;
  /**
   *
   */
  readonly PaymentBatch?: IPaymentBatch;
  /**
   *
   */
  readonly RequestInquiryBatch?: IRequestInquiryBatch;
  /**
   *
   */
  readonly RequestInquiry?: IRequestInquiry;
  /**
   *
   */
  readonly RequestResponse?: IRequestResponse;
  /**
   *
   */
  readonly RewardRecipient?: IRewardRecipient;
  /**
   *
   */
  readonly RewardSender?: IRewardSender;
  /**
   *
   */
  readonly ShareInviteMonetaryAccountInquiryBatch?: IShareInviteMonetaryAccountInquiryBatch;
  /**
   *
   */
  readonly ShareInviteMonetaryAccountInquiry?: IShareInviteMonetaryAccountInquiry;
  /**
   *
   */
  readonly ShareInviteMonetaryAccountResponse?: IShareInviteMonetaryAccountResponse;
  /**
   *
   */
  readonly SofortMerchantTransaction?: ISofortMerchantTransaction;
  /**
   *
   */
  readonly TabResultInquiry?: ITabResultInquiry;
  /**
   *
   */
  readonly TabResultResponse?: ITabResultResponse;
  /**
   *
   */
  readonly TransferwisePayment?: ITransferwiseTransfer;
}

export interface IEventListing {
  /**
   * The id of the event.
   */
  readonly id?: number;
  /**
   * The timestamp of the event's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the event's last update.
   */
  readonly updated?: string;
  /**
   * The performed action. Can be: CREATE or UPDATE.
   */
  readonly action?: string;
  /**
   * The id of the user the event applied to (if it was a user event).
   */
  readonly user_id?: string;
  /**
   * The id of the monetary account the event applied to (if it was a monetary account event).
   */
  readonly monetary_account_id?: string;
  /**
   * The details of the external object the event was created for.
   */
  readonly object?: IEventObject;
  /**
   * The event status. Can be: FINALIZED or AWAITING_REPLY. An example of FINALIZED event is a payment received event, while an AWAITING_REPLY event is a request received event.
   */
  readonly status?: string;
}

export interface IDraftShareInviteMonetaryAccountUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IDraftShareInviteMonetaryAccountRead {
  /**
   * The user who created the draft share invite.
   */
  readonly user_alias_created?: ILabelUser;
  /**
   * The status of the draft share invite. Can be USED, CANCELLED and PENDING.
   */
  readonly status?: string;
  /**
   * The moment when this draft share invite expires.
   */
  readonly expiration?: string;
  /**
   * The id of the share invite bank response this draft share belongs to.
   */
  readonly share_invite_bank_response_id?: number;
  /**
   * The URL redirecting user to the draft share invite in the app. Only works on mobile devices.
   */
  readonly draft_share_url?: string;
  /**
   * The draft share invite details.
   */
  readonly draft_share_settings?: IDraftShareInviteEntry;
  /**
   * The id of the newly created draft share invite.
   */
  readonly id?: number;
}

export interface IDraftShareInviteMonetaryAccountQrCodeContentListing {}

export interface IDraftShareInviteMonetaryAccountListing {
  /**
   * The user who created the draft share invite.
   */
  readonly user_alias_created?: ILabelUser;
  /**
   * The status of the draft share invite. Can be USED, CANCELLED and PENDING.
   */
  readonly status?: string;
  /**
   * The moment when this draft share invite expires.
   */
  readonly expiration?: string;
  /**
   * The id of the share invite bank response this draft share belongs to.
   */
  readonly share_invite_bank_response_id?: number;
  /**
   * The URL redirecting user to the draft share invite in the app. Only works on mobile devices.
   */
  readonly draft_share_url?: string;
  /**
   * The draft share invite details.
   */
  readonly draft_share_settings?: IDraftShareInviteEntry;
  /**
   * The id of the newly created draft share invite.
   */
  readonly id?: number;
}

export interface IDraftShareInviteMonetaryAccountCreate {
  /**
   * The id of the newly created draft share invite.
   */
  readonly id?: number;
}

export interface IDraftShareInviteMonetaryAccount {
  /**
   * The status of the draft share invite. Can be CANCELLED (the user cancels the draft share before it's used).
   */
  status?: string;
  /**
   * The moment when this draft share invite expires.
   */
  expiration: string;
  /**
   * The draft share invite details.
   */
  draft_share_settings: IDraftShareInviteEntry;
}

export interface IDraftShareInviteEntry {
  /**
   * The share details. Only one of these objects is returned.
   */
  share_detail?: IShareDetail;
  /**
   * The start date of this share.
   */
  start_date?: string;
  /**
   * The expiration date of this share.
   */
  end_date?: string;
}

export interface IDraftPaymentUpdate {
  /**
   * The id of the created DrafPayment.
   */
  readonly id?: number;
}

export interface IDraftPaymentResponse {
  /**
   * The status with which was responded.
   */
  readonly status?: string;
  /**
   * The user that responded to the DraftPayment.
   */
  readonly user_alias_created?: ILabelUser;
}

export interface IDraftPaymentRead {
  /**
   * The id of the created DrafPayment.
   */
  readonly id?: number;
  /**
   * The id of the MonetaryAccount the DraftPayment applies to.
   */
  readonly monetary_account_id?: number;
  /**
   * The label of the User who created the DraftPayment.
   */
  readonly user_alias_created?: ILabelUser;
  /**
   * All responses to this draft payment.
   */
  readonly responses?: Array<IDraftPaymentResponse>;
  /**
   * The status of the DraftPayment.
   */
  readonly status?: string;
  /**
   * The type of the DraftPayment.
   */
  readonly type?: string;
  /**
   * The entries in the DraftPayment.
   */
  readonly entries?: Array<IDraftPaymentEntry>;
  /**
   * The Payment or PaymentBatch. This will only be present after the DraftPayment has been accepted.
   */
  readonly object?: IDraftPaymentAnchorObject;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
  /**
   * The schedule details.
   */
  readonly schedule?: ISchedule;
}

export interface IDraftPaymentListing {
  /**
   * The id of the created DrafPayment.
   */
  readonly id?: number;
  /**
   * The id of the MonetaryAccount the DraftPayment applies to.
   */
  readonly monetary_account_id?: number;
  /**
   * The label of the User who created the DraftPayment.
   */
  readonly user_alias_created?: ILabelUser;
  /**
   * All responses to this draft payment.
   */
  readonly responses?: Array<IDraftPaymentResponse>;
  /**
   * The status of the DraftPayment.
   */
  readonly status?: string;
  /**
   * The type of the DraftPayment.
   */
  readonly type?: string;
  /**
   * The entries in the DraftPayment.
   */
  readonly entries?: Array<IDraftPaymentEntry>;
  /**
   * The Payment or PaymentBatch. This will only be present after the DraftPayment has been accepted.
   */
  readonly object?: IDraftPaymentAnchorObject;
  /**
   * The reference to the object used for split the bill. Can be RequestInquiry or RequestInquiryBatch
   */
  readonly request_reference_split_the_bill?: Array<IRequestInquiryReference>;
  /**
   * The schedule details.
   */
  readonly schedule?: ISchedule;
}

export interface IDraftPaymentEntry {
  /**
   * The amount of the payment.
   */
  amount?: IAmount;
  /**
   * The LabelMonetaryAccount containing the public information of the other (counterparty) side of the DraftPayment.
   */
  counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The description for the DraftPayment. Maximum 140 characters for DraftPayments to external IBANs, 9000 characters for DraftPayments to only other bunq MonetaryAccounts.
   */
  description?: string;
  /**
   * Optional data to be included with the Payment specific to the merchant.
   */
  merchant_reference?: string;
  /**
   * The Attachments attached to the DraftPayment.
   */
  attachment?: Array<IAttachmentMonetaryAccountPayment>;
  /**
   * The id of the draft payment entry.
   */
  readonly id?: number;
  /**
   * The LabelMonetaryAccount containing the public information of 'this' (party) side of the DraftPayment.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The type of the draft payment entry.
   */
  readonly type?: string;
}

export interface IDraftPaymentCreate {
  /**
   * The id of the created DrafPayment.
   */
  readonly id?: number;
}

export interface IDraftPaymentAnchorObject {
  /**
   *
   */
  readonly Payment?: IPayment;
  /**
   *
   */
  readonly PaymentBatch?: IPaymentBatch;
}

export interface IDraftPayment {
  /**
   * The status of the DraftPayment.
   */
  status?: string;
  /**
   * The list of entries in the DraftPayment. Each entry will result in a payment when the DraftPayment is accepted.
   */
  entries: Array<IDraftPaymentEntry>;
  /**
   * The last updated_timestamp that you received for this DraftPayment. This needs to be provided to prevent race conditions.
   */
  previous_updated_timestamp?: string;
  /**
   * The number of accepts that are required for the draft payment to receive status ACCEPTED. Currently only 1 is valid.
   */
  number_of_required_accepts: number;
  /**
   * The schedule details when creating or updating a scheduled payment.
   */
  schedule?: ISchedule;
}

export interface IDeviceServerRead {
  /**
   * The id of the DeviceServer as created on the server.
   */
  readonly id?: number;
  /**
   * The timestamp of the DeviceServer's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the DeviceServer's last update.
   */
  readonly updated?: string;
  /**
   * The description of the DeviceServer.
   */
  readonly description?: string;
  /**
   * The ip address which was used to create the DeviceServer.
   */
  readonly ip?: string;
  /**
   * The status of the DeviceServer. Can be ACTIVE, BLOCKED, NEEDS_CONFIRMATION or OBSOLETE.
   */
  readonly status?: string;
}

export interface IDeviceServerListing {
  /**
   * The id of the DeviceServer as created on the server.
   */
  readonly id?: number;
  /**
   * The timestamp of the DeviceServer's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the DeviceServer's last update.
   */
  readonly updated?: string;
  /**
   * The description of the DeviceServer.
   */
  readonly description?: string;
  /**
   * The ip address which was used to create the DeviceServer.
   */
  readonly ip?: string;
  /**
   * The status of the DeviceServer. Can be ACTIVE, BLOCKED, NEEDS_CONFIRMATION or OBSOLETE.
   */
  readonly status?: string;
}

export interface IDeviceServerCreate {
  /**
   * The id of the DeviceServer as created on the server.
   */
  readonly id?: number;
}

export interface IDeviceServer {
  /**
   * The description of the DeviceServer. This is only for your own reference when reading the DeviceServer again.
   */
  description: string;
  /**
   * The API key. You can request an API key in the bunq app.
   */
  secret: string;
  /**
   * An array of IPs (v4 or v6) this DeviceServer will be able to do calls from. These will be linked to the API key.
   */
  permitted_ips?: Array<string>;
}

export interface IDeviceRead {
  /**
   *
   */
  readonly DeviceServer?: IDeviceServer;
}

export interface IDeviceListing {
  /**
   *
   */
  readonly DeviceServer?: IDeviceServer;
}

export interface ICustomerLimitListing {
  /**
   * The limit of monetary accounts.
   */
  readonly limit_monetary_account?: number;
  /**
   * The amount of additional monetary accounts you can create.
   */
  readonly limit_monetary_account_remaining?: number;
  /**
   * The limit of Maestro cards.
   */
  readonly limit_card_debit_maestro?: number;
  /**
   * The limit of MasterCard cards.
   */
  readonly limit_card_debit_mastercard?: number;
  /**
   * DEPRECTATED: The limit of wildcards, e.g. Maestro or MasterCard cards.
   */
  readonly limit_card_debit_wildcard?: number;
  /**
   * The limit of wildcards, e.g. Maestro or MasterCard cards.
   */
  readonly limit_card_wildcard?: number;
  /**
   * DEPRECTATED: The limit of free replacement debit cards, replaced by: limit_card_replacement
   */
  readonly limit_card_debit_replacement?: number;
  /**
   * The limit of free replacement cards.
   */
  readonly limit_card_replacement?: number;
  /**
   * The maximum amount a user is allowed to spend in a month.
   */
  readonly limit_amount_monthly?: IAmount;
  /**
   * The amount the user has spent in the last month.
   */
  readonly spent_amount_monthly?: IAmount;
}

export interface ICustomerLimit {
  /**
   * The limit of monetary accounts.
   */
  readonly limit_monetary_account?: number;
  /**
   * The amount of additional monetary accounts you can create.
   */
  readonly limit_monetary_account_remaining?: number;
  /**
   * The limit of Maestro cards.
   */
  readonly limit_card_debit_maestro?: number;
  /**
   * The limit of MasterCard cards.
   */
  readonly limit_card_debit_mastercard?: number;
  /**
   * DEPRECTATED: The limit of wildcards, e.g. Maestro or MasterCard cards.
   */
  readonly limit_card_debit_wildcard?: number;
  /**
   * The limit of wildcards, e.g. Maestro or MasterCard cards.
   */
  readonly limit_card_wildcard?: number;
  /**
   * DEPRECTATED: The limit of free replacement debit cards, replaced by: limit_card_replacement
   */
  readonly limit_card_debit_replacement?: number;
  /**
   * The limit of free replacement cards.
   */
  readonly limit_card_replacement?: number;
  /**
   * The maximum amount a user is allowed to spend in a month.
   */
  readonly limit_amount_monthly?: IAmount;
  /**
   * The amount the user has spent in the last month.
   */
  readonly spent_amount_monthly?: IAmount;
}

export interface ICustomer {
  /**
   * The primary billing account account's id.
   */
  billing_account_id?: string;
  /**
   * The preferred notification type for invoices.
   */
  invoice_notification_preference?: string;
  /**
   * The id of the customer.
   */
  readonly id?: number;
  /**
   * The timestamp of the customer object's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the customer object's last update.
   */
  readonly updated?: string;
}

export interface ICoOwner {
  /**
   * The Alias of the co-owner.
   */
  alias?: ILabelUser;
  /**
   * Can be: ACCEPTED, REJECTED, PENDING or REVOKED
   */
  readonly status?: string;
}

export interface IConfirmationOfFundsCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IConfirmationOfFunds {
  /**
   * The pointer (IBAN) of the account we're querying.
   */
  pointer_iban: IPointer;
  /**
   * The amount we want to check for.
   */
  amount: IAmount;
}

export interface ICertificatePinnedRead {
  /**
   * The certificate chain in .PEM format. Certificates are glued with newline characters.
   */
  readonly certificate_chain?: string;
  /**
   * The id generated for the pinned certificate chain.
   */
  readonly id?: number;
}

export interface ICertificatePinnedListing {
  /**
   * The certificate chain in .PEM format. Certificates are glued with newline characters.
   */
  readonly certificate_chain?: string;
  /**
   * The id generated for the pinned certificate chain.
   */
  readonly id?: number;
}

export interface ICertificatePinnedDelete {}

export interface ICertificatePinnedCreate {
  /**
   * The id generated for the pinned certificate chain.
   */
  readonly id?: number;
}

export interface ICertificatePinned {
  /**
   * The certificate chain in .PEM format.
   */
  certificate_chain: Array<ICertificate>;
}

export interface ICertificate {
  /**
   * A single certificate in the chain in .PEM format.
   */
  certificate?: string;
}

export interface ICashRegisterUpdate {
  /**
   * The id of the updated CashRegister.
   */
  readonly id?: number;
}

export interface ICashRegisterRead {
  /**
   * The id of the created CashRegister.
   */
  readonly id?: number;
  /**
   * The timestamp of the CashRegister's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the CashRegister's last update.
   */
  readonly updated?: string;
  /**
   * The name of the CashRegister.
   */
  readonly name?: string;
  /**
   * The status of the CashRegister. Can be PENDING_APPROVAL, ACTIVE, DENIED or CLOSED.
   */
  readonly status?: string;
  /**
   * The Avatar of the CashRegister.
   */
  readonly avatar?: IAvatar;
  /**
   * The geolocation of the CashRegister. Can be null.
   */
  readonly location?: IGeolocation;
  /**
   * The tab text for waiting screen of CashRegister.
   */
  readonly tab_text_waiting_screen?: Array<ITabTextWaitingScreen>;
}

export interface ICashRegisterQrCodeUpdate {
  /**
   * The id of the updated QR code. Use this id to get the RAW content of the QR code with: ../qr-code/{id}/content
   */
  readonly id?: number;
}

export interface ICashRegisterQrCodeRead {
  /**
   * The id of the created QR code. Use this id to get the RAW content of the QR code with: ../qr-code/{id}/content
   */
  readonly id?: number;
  /**
   * The timestamp of the QR code's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the TokenQrCashRegister's last update.
   */
  readonly updated?: string;
  /**
   * The status of this QR code. If the status is "ACTIVE" the QR code can be scanned to see the linked CashRegister and tab. If the status is "INACTIVE" the QR code does not link to a anything.
   */
  readonly status?: string;
  /**
   * The CashRegister that is linked to the token.
   */
  readonly cash_register?: ICashRegister;
  /**
   * Holds the Tab object. Can be TabUsageSingle, TabUsageMultiple or null
   */
  readonly tab_object?: ITab;
}

export interface ICashRegisterQrCodeListing {
  /**
   * The id of the created QR code. Use this id to get the RAW content of the QR code with: ../qr-code/{id}/content
   */
  readonly id?: number;
  /**
   * The timestamp of the QR code's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the TokenQrCashRegister's last update.
   */
  readonly updated?: string;
  /**
   * The status of this QR code. If the status is "ACTIVE" the QR code can be scanned to see the linked CashRegister and tab. If the status is "INACTIVE" the QR code does not link to a anything.
   */
  readonly status?: string;
  /**
   * The CashRegister that is linked to the token.
   */
  readonly cash_register?: ICashRegister;
  /**
   * Holds the Tab object. Can be TabUsageSingle, TabUsageMultiple or null
   */
  readonly tab_object?: ITab;
}

export interface ICashRegisterQrCodeCreate {
  /**
   * The id of the created QR code. Use this id to get the RAW content of the QR code with: ../qr-code/{id}/content
   */
  readonly id?: number;
}

export interface ICashRegisterQrCodeContentListing {}

export interface ICashRegisterQrCode {
  /**
   * The status of the QR code. ACTIVE or INACTIVE. Only one QR code can be ACTIVE for a CashRegister at any time. Setting a QR code to ACTIVE will deactivate any other CashRegister QR codes.
   */
  status: string;
}

export interface ICashRegisterListing {
  /**
   * The id of the created CashRegister.
   */
  readonly id?: number;
  /**
   * The timestamp of the CashRegister's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the CashRegister's last update.
   */
  readonly updated?: string;
  /**
   * The name of the CashRegister.
   */
  readonly name?: string;
  /**
   * The status of the CashRegister. Can be PENDING_APPROVAL, ACTIVE, DENIED or CLOSED.
   */
  readonly status?: string;
  /**
   * The Avatar of the CashRegister.
   */
  readonly avatar?: IAvatar;
  /**
   * The geolocation of the CashRegister. Can be null.
   */
  readonly location?: IGeolocation;
  /**
   * The tab text for waiting screen of CashRegister.
   */
  readonly tab_text_waiting_screen?: Array<ITabTextWaitingScreen>;
}

export interface ICashRegisterCreate {
  /**
   * The id of the created CashRegister.
   */
  readonly id?: number;
}

export interface ICashRegister {
  /**
   * The name of the CashRegister.
   */
  name?: string;
  /**
   * The status of the CashRegister. Can be PENDING_APPROVAL, ACTIVE, DENIED or CLOSED.
   */
  status?: string;
  /**
   * The UUID of the avatar of the CashRegister. Use the calls /attachment-public and /avatar to create a new Avatar and get its UUID.
   */
  avatar_uuid: string;
  /**
   * The geolocation of the CashRegister. Can be null.
   */
  location?: IGeolocation;
  /**
   * The tab text for waiting screen of CashRegister.
   */
  tab_text_waiting_screen?: Array<ITabTextWaitingScreen>;
  /**
   * The id of the created CashRegister.
   */
  readonly id?: number;
  /**
   * The timestamp of the CashRegister's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the CashRegister's last update.
   */
  readonly updated?: string;
  /**
   * The Avatar of the CashRegister.
   */
  readonly avatar?: IAvatar;
}

export interface ICardUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ICardReplaceCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ICardReplace {
  /**
   * The user's name as it will be on the card. Check 'card-name' for the available card names for a user.
   */
  name_on_card?: string;
  /**
   * Array of Types, PINs, account IDs assigned to the card.
   */
  pin_code_assignment?: Array<ICardPinAssignment>;
  /**
   * The second line on the card.
   */
  second_line?: string;
}

export interface ICardRead {
  /**
   * The id of the card.
   */
  readonly id?: number;
  /**
   * The timestamp of the card's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the card's last update.
   */
  readonly updated?: string;
  /**
   * The public UUID of the card.
   */
  readonly public_uuid?: string;
  /**
   * The type of the card. Can be MAESTRO, MASTERCARD.
   */
  readonly type?: string;
  /**
   * The sub-type of the card.
   */
  readonly sub_type?: string;
  /**
   * The second line of text on the card
   */
  readonly second_line?: string;
  /**
   * The status to set for the card. Can be ACTIVE, DEACTIVATED, LOST, STOLEN, CANCELLED, EXPIRED or PIN_TRIES_EXCEEDED.
   */
  readonly status?: string;
  /**
   * The sub-status of the card. Can be NONE or REPLACED.
   */
  readonly sub_status?: string;
  /**
   * The order status of the card. Can be CARD_UPDATE_REQUESTED, CARD_UPDATE_SENT, CARD_UPDATE_ACCEPTED, ACCEPTED_FOR_PRODUCTION or DELIVERED_TO_CUSTOMER.
   */
  readonly order_status?: string;
  /**
   * Expiry date of the card.
   */
  readonly expiry_date?: string;
  /**
   * The user's name on the card.
   */
  readonly name_on_card?: string;
  /**
   * Array of PANs and their attributes.
   */
  readonly primary_account_numbers?: Array<ICardPrimaryAccountNumber>;
  /**
   * The spending limit for the card.
   */
  readonly card_limit?: IAmount;
  /**
   * The ATM spending limit for the card.
   */
  readonly card_limit_atm?: IAmount;
  /**
   * The countries for which to grant (temporary) permissions to use the card.
   */
  readonly country_permission?: Array<ICardCountryPermission>;
  /**
   * The monetary account this card was ordered on and the label user that owns the card.
   */
  readonly label_monetary_account_ordered?: ILabelMonetaryAccount;
  /**
   * The monetary account that this card is currently linked to and the label user viewing it.
   */
  readonly label_monetary_account_current?: ILabelMonetaryAccount;
  /**
   * Array of Types, PINs, account IDs assigned to the card.
   */
  readonly pin_code_assignment?: Array<ICardPinAssignment>;
  /**
   * ID of the MA to be used as fallback for this card if insufficient balance. Fallback account is removed if not supplied.
   */
  readonly monetary_account_id_fallback?: number;
  /**
   * The country that is domestic to the card. Defaults to country of residence of user.
   */
  readonly country?: string;
}

export interface ICardPrimaryAccountNumber {
  /**
   * The ID for this Virtual PAN.
   */
  id?: number;
  /**
   * The description for this PAN.
   */
  description?: string;
  /**
   * The status for this PAN, only for Online Cards.
   */
  status?: string;
  /**
   * The ID of the monetary account to assign to this PAN, only for Online Cards.
   */
  monetary_account_id?: number;
  /**
   * The UUID for this Virtual PAN.
   */
  readonly uuid?: string;
  /**
   * The last four digits of the PAN.
   */
  readonly four_digit?: string;
}

export interface ICardPinAssignment {
  /**
   * PIN type. Can be PRIMARY, SECONDARY or TERTIARY
   */
  type: AssignmentType;
  /**
   * The 4 digit PIN to be assigned to this account.
   */
  pin_code?: string;
  /**
   * The ID of the monetary account to assign to this pin for the card.
   */
  monetary_account_id: number;
}

export interface ICardNameListing {
  /**
   * All possible variations (of suitable length) of user's legal name for the debit card.
   */
  readonly possible_card_name_array?: Array<string>;
}

export interface ICardListing {
  /**
   * The id of the card.
   */
  readonly id?: number;
  /**
   * The timestamp of the card's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the card's last update.
   */
  readonly updated?: string;
  /**
   * The public UUID of the card.
   */
  readonly public_uuid?: string;
  /**
   * The type of the card. Can be MAESTRO, MASTERCARD.
   */
  readonly type?: string;
  /**
   * The sub-type of the card.
   */
  readonly sub_type?: string;
  /**
   * The second line of text on the card
   */
  readonly second_line?: string;
  /**
   * The status to set for the card. Can be ACTIVE, DEACTIVATED, LOST, STOLEN, CANCELLED, EXPIRED or PIN_TRIES_EXCEEDED.
   */
  readonly status?: string;
  /**
   * The sub-status of the card. Can be NONE or REPLACED.
   */
  readonly sub_status?: string;
  /**
   * The order status of the card. Can be CARD_UPDATE_REQUESTED, CARD_UPDATE_SENT, CARD_UPDATE_ACCEPTED, ACCEPTED_FOR_PRODUCTION or DELIVERED_TO_CUSTOMER.
   */
  readonly order_status?: string;
  /**
   * Expiry date of the card.
   */
  readonly expiry_date?: string;
  /**
   * The user's name on the card.
   */
  readonly name_on_card?: string;
  /**
   * Array of PANs and their attributes.
   */
  readonly primary_account_numbers?: Array<ICardPrimaryAccountNumber>;
  /**
   * The spending limit for the card.
   */
  readonly card_limit?: IAmount;
  /**
   * The ATM spending limit for the card.
   */
  readonly card_limit_atm?: IAmount;
  /**
   * The countries for which to grant (temporary) permissions to use the card.
   */
  readonly country_permission?: Array<ICardCountryPermission>;
  /**
   * The monetary account this card was ordered on and the label user that owns the card.
   */
  readonly label_monetary_account_ordered?: ILabelMonetaryAccount;
  /**
   * The monetary account that this card is currently linked to and the label user viewing it.
   */
  readonly label_monetary_account_current?: ILabelMonetaryAccount;
  /**
   * Array of Types, PINs, account IDs assigned to the card.
   */
  readonly pin_code_assignment?: Array<ICardPinAssignment>;
  /**
   * ID of the MA to be used as fallback for this card if insufficient balance. Fallback account is removed if not supplied.
   */
  readonly monetary_account_id_fallback?: number;
  /**
   * The country that is domestic to the card. Defaults to country of residence of user.
   */
  readonly country?: string;
}

export interface ICardGeneratedCvc2Update {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ICardGeneratedCvc2Read {
  /**
   * The id of the cvc code.
   */
  readonly id?: number;
  /**
   * The timestamp of the cvc code's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the cvc code's last update.
   */
  readonly updated?: string;
  /**
   * The type of generated cvc2. Can be STATIC or GENERATED.
   */
  readonly type?: string;
  /**
   * The cvc2 code.
   */
  readonly cvc2?: string;
  /**
   * The status of the cvc2. Can be AVAILABLE, USED, EXPIRED, BLOCKED.
   */
  readonly status?: string;
  /**
   * Expiry time of the cvc2.
   */
  readonly expiry_time?: string;
}

export interface ICardGeneratedCvc2Listing {
  /**
   * The id of the cvc code.
   */
  readonly id?: number;
  /**
   * The timestamp of the cvc code's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the cvc code's last update.
   */
  readonly updated?: string;
  /**
   * The type of generated cvc2. Can be STATIC or GENERATED.
   */
  readonly type?: string;
  /**
   * The cvc2 code.
   */
  readonly cvc2?: string;
  /**
   * The status of the cvc2. Can be AVAILABLE, USED, EXPIRED, BLOCKED.
   */
  readonly status?: string;
  /**
   * Expiry time of the cvc2.
   */
  readonly expiry_time?: string;
}

export interface ICardGeneratedCvc2Create {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ICardGeneratedCvc2 {
  /**
   * The type of generated cvc2. Can be STATIC or GENERATED.
   */
  type?: string;
}

export interface ICardDebitCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ICardDebit {
  /**
   * The second line of text on the card, used as name/description for it. It can contain at most 17 characters and it can be empty.
   */
  second_line: string;
  /**
   * The user's name as it will be on the card. Check 'card-name' for the available card names for a user.
   */
  name_on_card: string;
  /**
   * The pointer to the monetary account that will be connected at first with the card. Its IBAN code is also the one that will be printed on the card itself. The pointer must be of type IBAN.
   */
  alias?: IPointer;
  /**
   * The type of card to order. Can be MAESTRO or MASTERCARD.
   */
  type: string;
  /**
   * Array of Types, PINs, account IDs assigned to the card.
   */
  pin_code_assignment?: Array<ICardPinAssignment>;
  /**
   * ID of the MA to be used as fallback for this card if insufficient balance. Fallback account is removed if not supplied.
   */
  monetary_account_id_fallback?: number;
}

export interface ICardCreditCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface ICardCredit {
  /**
   * The second line of text on the card, used as name/description for it. It can contain at most 17 characters and it can be empty.
   */
  second_line: string;
  /**
   * The user's name as it will be on the card. Check 'card-name' for the available card names for a user.
   */
  name_on_card: string;
  /**
   * The pointer to the monetary account that will be connected at first with the card. Its IBAN code is also the one that will be printed on the card itself. The pointer must be of type IBAN.
   */
  alias?: IPointer;
  /**
   * The type of card to order. Can be MASTERCARD.
   */
  type: string;
  /**
   * Array of Types, PINs, account IDs assigned to the card.
   */
  pin_code_assignment?: Array<ICardPinAssignment>;
  /**
   * ID of the MA to be used as fallback for this card if insufficient balance. Fallback account is removed if not supplied.
   */
  monetary_account_id_fallback?: number;
}

export interface ICardCountryPermission {
  /**
   * The country to allow transactions in (e.g. NL, DE).
   */
  country: string;
  /**
   * Expiry time of this rule.
   */
  expiry_time: string;
  /**
   * The id of the card country permission entry.
   */
  readonly id?: number;
}

export interface ICardBatchEntry {
  /**
   * The ID of the card that needs to be updated.
   */
  id: number;
  /**
   * The status to set for the card. Can be ACTIVE, DEACTIVATED, LOST, STOLEN or CANCELLED, and can only be set to LOST/STOLEN/CANCELLED when order status is ACCEPTED_FOR_PRODUCTION/DELIVERED_TO_CUSTOMER/CARD_UPDATE_REQUESTED/CARD_UPDATE_SENT/CARD_UPDATE_ACCEPTED. Can only be set to DEACTIVATED after initial activation, i.e. order_status is DELIVERED_TO_CUSTOMER/CARD_UPDATE_REQUESTED/CARD_UPDATE_SENT/CARD_UPDATE_ACCEPTED. Mind that all the possible choices (apart from ACTIVE and DEACTIVATED) are permanent and cannot be changed after.
   */
  status?: string;
  /**
   * The spending limit for the card.
   */
  card_limit?: IAmount;
  /**
   * The ATM spending limit for the card.
   */
  card_limit_atm?: IAmount;
  /**
   * The countries for which to grant (temporary) permissions to use the card.
   */
  country_permission?: Array<ICardCountryPermission>;
  /**
   * ID of the MA to be used as fallback for this card if insufficient balance. Fallback account is removed if not supplied.
   */
  monetary_account_id_fallback?: number;
}

export interface ICardBatchCreate {
  /**
   * The ids of the cards that have been updated.
   */
  readonly updated_card_ids?: Array<BunqId>;
}

export interface ICardBatch {
  /**
   * The cards that need to be updated.
   */
  cards: Array<ICardBatchEntry>;
}

export interface ICard {
  /**
   * The plaintext pin code. Requests require encryption to be enabled.
   */
  pin_code?: string;
  /**
   * DEPRECATED: Activate a card by setting status to ACTIVE when the order_status is ACCEPTED_FOR_PRODUCTION.
   */
  activation_code?: string;
  /**
   * The status to set for the card. Can be ACTIVE, DEACTIVATED, LOST, STOLEN or CANCELLED, and can only be set to LOST/STOLEN/CANCELLED when order status is ACCEPTED_FOR_PRODUCTION/DELIVERED_TO_CUSTOMER/CARD_UPDATE_REQUESTED/CARD_UPDATE_SENT/CARD_UPDATE_ACCEPTED. Can only be set to DEACTIVATED after initial activation, i.e. order_status is DELIVERED_TO_CUSTOMER/CARD_UPDATE_REQUESTED/CARD_UPDATE_SENT/CARD_UPDATE_ACCEPTED. Mind that all the possible choices (apart from ACTIVE and DEACTIVATED) are permanent and cannot be changed after.
   */
  status?: string;
  /**
   * The spending limit for the card.
   */
  card_limit?: IAmount;
  /**
   * The ATM spending limit for the card.
   */
  card_limit_atm?: IAmount;
  /**
   * The countries for which to grant (temporary) permissions to use the card.
   */
  country_permission?: Array<ICardCountryPermission>;
  /**
   * Array of Types, PINs, account IDs assigned to the card.
   */
  pin_code_assignment?: Array<ICardPinAssignment>;
  /**
   * Array of PANs and their attributes.
   */
  primary_account_numbers?: Array<ICardPrimaryAccountNumber>;
  /**
   * ID of the MA to be used as fallback for this card if insufficient balance. Fallback account is removed if not supplied.
   */
  monetary_account_id_fallback?: number;
}

export interface IBunqMeTabUpdate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IBunqMeTabResultResponseRead {
  /**
   * The payment made for the bunq.me tab.
   */
  readonly payment?: IPayment;
}

export interface IBunqMeTabResultResponse {
  /**
   * The payment made for the bunq.me tab.
   */
  readonly payment?: IPayment;
}

export interface IBunqMeTabResultInquiry {
  /**
   * The payment made for the Tab.
   */
  readonly payment?: IPayment;
  /**
   * The Id of the bunq.me tab that this BunqMeTabResultInquiry belongs to.
   */
  readonly bunq_me_tab_id?: number;
}

export interface IBunqMeTabRead {
  /**
   * The id of the created bunq.me.
   */
  readonly id?: number;
  /**
   * The timestamp when the bunq.me was created.
   */
  readonly created?: string;
  /**
   * The timestamp when the bunq.me was last updated.
   */
  readonly updated?: string;
  /**
   * The timestamp of when the bunq.me expired or will expire.
   */
  readonly time_expiry?: string;
  /**
   * The id of the MonetaryAccount the bunq.me was sent from.
   */
  readonly monetary_account_id?: number;
  /**
   * The status of the bunq.me. Can be WAITING_FOR_PAYMENT, CANCELLED or EXPIRED.
   */
  readonly status?: string;
  /**
   * The url that points to the bunq.me page.
   */
  readonly bunqme_tab_share_url?: string;
  /**
   * The bunq.me entry containing the payment information.
   */
  readonly bunqme_tab_entry?: IBunqMeTabEntry;
  /**
   * The list of bunq.me result Inquiries successfully made and paid.
   */
  readonly result_inquiries?: Array<IBunqMeTabResultInquiry>;
}

export interface IBunqMeTabListing {
  /**
   * The id of the created bunq.me.
   */
  readonly id?: number;
  /**
   * The timestamp when the bunq.me was created.
   */
  readonly created?: string;
  /**
   * The timestamp when the bunq.me was last updated.
   */
  readonly updated?: string;
  /**
   * The timestamp of when the bunq.me expired or will expire.
   */
  readonly time_expiry?: string;
  /**
   * The id of the MonetaryAccount the bunq.me was sent from.
   */
  readonly monetary_account_id?: number;
  /**
   * The status of the bunq.me. Can be WAITING_FOR_PAYMENT, CANCELLED or EXPIRED.
   */
  readonly status?: string;
  /**
   * The url that points to the bunq.me page.
   */
  readonly bunqme_tab_share_url?: string;
  /**
   * The bunq.me entry containing the payment information.
   */
  readonly bunqme_tab_entry?: IBunqMeTabEntry;
  /**
   * The list of bunq.me result Inquiries successfully made and paid.
   */
  readonly result_inquiries?: Array<IBunqMeTabResultInquiry>;
}

export interface IBunqMeTabEntry {
  /**
   * The requested Amount.
   */
  amount_inquired?: IAmount;
  /**
   * The description for the bunq.me. Maximum 9000 characters.
   */
  description?: string;
  /**
   * The URL which the user is sent to when a payment is completed.
   */
  redirect_url?: string;
  /**
   * The uuid of the bunq.me.
   */
  readonly uuid?: string;
  /**
   * The LabelMonetaryAccount with the public information of the User and the MonetaryAccount that created the bunq.me link.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The status of the bunq.me. Can be WAITING_FOR_PAYMENT, CANCELLED or EXPIRED.
   */
  readonly status?: string;
  /**
   * List of available merchants.
   */
  readonly merchant_available?: Array<IBunqMeMerchantAvailable>;
}

export interface IBunqMeTabCreate {
  /**
   * The id of the created bunq.me.
   */
  readonly id?: number;
}

export interface IBunqMeTab {
  /**
   * The bunq.me entry containing the payment information.
   */
  bunqme_tab_entry: IBunqMeTabEntry;
  /**
   * The status of the bunq.me. Ignored in POST requests but can be used for cancelling the bunq.me by setting status as CANCELLED with a PUT request.
   */
  status?: string;
}

export interface IBunqMeMerchantAvailable {
  /**
   * A merchant type supported by bunq.me.
   */
  readonly merchant_type?: string;
  /**
   * Whether or not the merchant is available for the user.
   */
  readonly available?: boolean;
}

export interface IBunqMeFundraiserResultRead {
  /**
   * The id of the bunq.me.
   */
  readonly id?: number;
  /**
   * The timestamp when the bunq.me was created.
   */
  readonly created?: string;
  /**
   * The timestamp when the bunq.me was last updated.
   */
  readonly updated?: string;
  /**
   * The bunq.me fundraiser profile.
   */
  readonly bunqme_fundraiser_profile?: IBunqMeFundraiserProfile;
  /**
   * The list of payments, paid to the bunq.me fundraiser profile.
   */
  readonly payments?: Array<IPayment>;
}

export interface IBunqMeFundraiserResult {
  /**
   * The id of the bunq.me.
   */
  readonly id?: number;
  /**
   * The timestamp when the bunq.me was created.
   */
  readonly created?: string;
  /**
   * The timestamp when the bunq.me was last updated.
   */
  readonly updated?: string;
  /**
   * The bunq.me fundraiser profile.
   */
  readonly bunqme_fundraiser_profile?: IBunqMeFundraiserProfile;
  /**
   * The list of payments, paid to the bunq.me fundraiser profile.
   */
  readonly payments?: Array<IPayment>;
}

export interface IBunqMeFundraiserProfileUserRead {
  /**
   * Id of the monetary account on which you want to receive bunq.me payments.
   */
  readonly monetary_account_id?: number;
  /**
   * The color chosen for the bunq.me fundraiser profile in hexadecimal format.
   */
  readonly color?: string;
  /**
   * The LabelMonetaryAccount with the public information of the User and the MonetaryAccount that created the bunq.me fundraiser profile.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The description of the bunq.me fundraiser profile.
   */
  readonly description?: string;
  /**
   * The attachment used for the background of the bunq.me fundraiser profile.
   */
  readonly attachment?: IAttachmentPublic;
  /**
   * The pointer (url) which will be used to access the bunq.me fundraiser profile.
   */
  readonly pointer?: IPointer;
  /**
   * The URL which the user is sent to when a payment is completed.
   */
  readonly redirect_url?: string;
  /**
   * The status of the bunq.me fundraiser profile, can be ACTIVE or DEACTIVATED.
   */
  readonly status?: string;
}

export interface IBunqMeFundraiserProfileUserListing {
  /**
   * Id of the monetary account on which you want to receive bunq.me payments.
   */
  readonly monetary_account_id?: number;
  /**
   * The color chosen for the bunq.me fundraiser profile in hexadecimal format.
   */
  readonly color?: string;
  /**
   * The LabelMonetaryAccount with the public information of the User and the MonetaryAccount that created the bunq.me fundraiser profile.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The description of the bunq.me fundraiser profile.
   */
  readonly description?: string;
  /**
   * The attachment used for the background of the bunq.me fundraiser profile.
   */
  readonly attachment?: IAttachmentPublic;
  /**
   * The pointer (url) which will be used to access the bunq.me fundraiser profile.
   */
  readonly pointer?: IPointer;
  /**
   * The URL which the user is sent to when a payment is completed.
   */
  readonly redirect_url?: string;
  /**
   * The status of the bunq.me fundraiser profile, can be ACTIVE or DEACTIVATED.
   */
  readonly status?: string;
}

export interface IBunqMeFundraiserProfile {
  /**
   * The pointer (url) which will be used to access the bunq.me fundraiser profile.
   */
  pointer?: IPointer;
  /**
   * The color chosen for the bunq.me fundraiser profile in hexadecimal format.
   */
  readonly color?: string;
  /**
   * The LabelMonetaryAccount with the public information of the User and the MonetaryAccount that created the bunq.me fundraiser profile.
   */
  readonly alias?: ILabelMonetaryAccount;
  /**
   * The description of the bunq.me fundraiser profile.
   */
  readonly description?: string;
  /**
   * The attachment attached to the fundraiser profile.
   */
  readonly attachment?: IAttachmentPublic;
  /**
   * The status of the bunq.me fundraiser profile, can be ACTIVE or DEACTIVATED.
   */
  readonly status?: string;
  /**
   * The URL which the user is sent to when a payment is completed.
   */
  readonly redirect_url?: string;
  /**
   * Provided if the user has enabled their invite link.
   */
  readonly invite_profile_name?: string;
}

export interface IBunqId {
  /**
   * An integer ID of an object. Unique per object type.
   */
  id?: number;
}

export interface IBudgetRestriction {
  /**
   * The amount of the budget given to the invited user.
   */
  amount?: IAmount;
  /**
   * The duration for a budget restriction. Valid values are DAILY, WEEKLY, MONTHLY, YEARLY.
   */
  frequency?: string;
}

export interface IBillingContractSubscriptionListing {
  /**
   * The id of the billing contract.
   */
  readonly id?: number;
  /**
   * The timestamp when the billing contract was made.
   */
  readonly created?: string;
  /**
   * The timestamp when the billing contract was last updated.
   */
  readonly updated?: string;
  /**
   * The date from when the billing contract is valid.
   */
  readonly contract_date_start?: string;
  /**
   * The date until when the billing contract is valid.
   */
  readonly contract_date_end?: string;
  /**
   * The version of the billing contract.
   */
  readonly contract_version?: number;
  /**
   * The subscription type of the user. Can be one of PERSON_SUPER_LIGHT_V1, PERSON_LIGHT_V1, PERSON_MORE_V1, PERSON_FREE_V1, PERSON_PREMIUM_V1, COMPANY_V1, or COMPANY_V2.
   */
  readonly subscription_type?: string;
  /**
   * The subscription type the user will have after a subscription downgrade. Will be null if downgrading is not possible.
   */
  readonly subscription_type_downgrade?: string;
  /**
   * The subscription status.
   */
  readonly status?: string;
  /**
   * The subscription substatus.
   */
  readonly sub_status?: string;
}

export interface IBillingContractSubscription {
  /**
   * The subscription type of the user. Can be one of PERSON_SUPER_LIGHT_V1, PERSON_LIGHT_V1, PERSON_MORE_V1, PERSON_FREE_V1, PERSON_PREMIUM_V1, COMPANY_V1, or COMPANY_V2.
   */
  subscription_type?: string;
  /**
   * The id of the billing contract.
   */
  readonly id?: number;
  /**
   * The timestamp when the billing contract was made.
   */
  readonly created?: string;
  /**
   * The timestamp when the billing contract was last updated.
   */
  readonly updated?: string;
  /**
   * The date from when the billing contract is valid.
   */
  readonly contract_date_start?: string;
  /**
   * The date until when the billing contract is valid.
   */
  readonly contract_date_end?: string;
  /**
   * The version of the billing contract.
   */
  readonly contract_version?: number;
  /**
   * The subscription type the user will have after a subscription downgrade. Will be null if downgrading is not possible.
   */
  readonly subscription_type_downgrade?: string;
  /**
   * The subscription status.
   */
  readonly status?: string;
  /**
   * The subscription substatus.
   */
  readonly sub_status?: string;
}

export interface IBankSwitchServiceNetherlandsIncomingPaymentRead {
  /**
   * The bank switch service details.
   */
  readonly bank_switch_service?: IBankSwitchServiceNetherlandsIncoming;
  /**
   * The payment made using bank switch service.
   */
  readonly payment?: IPayment;
}

export interface IBankSwitchServiceNetherlandsIncomingPayment {
  /**
   * The bank switch service details.
   */
  readonly bank_switch_service?: IBankSwitchServiceNetherlandsIncoming;
  /**
   * The payment made using bank switch service.
   */
  readonly payment?: IPayment;
}

export interface IBankSwitchServiceNetherlandsIncoming {
  /**
   * The label of the monetary of this switch service.
   */
  alias?: ILabelMonetaryAccount;
  /**
   * The IBAN alias that's displayed for this switch service.
   */
  counterparty_alias?: ILabelMonetaryAccount;
  /**
   * The status of the switch service.
   */
  status?: string;
  /**
   * The sub status of the switch service.
   */
  sub_status?: string;
  /**
   * The timestamp when the switch service actually starts.
   */
  time_start_actual?: string;
  /**
   * The label of the user creator of this switch service.
   */
  readonly user_alias?: ILabelUser;
  /**
   * The timestamp when the switch service desired to be start.
   */
  readonly time_start_desired?: string;
  /**
   * The timestamp when the switch service ends.
   */
  readonly time_end?: string;
  /**
   * Reference to the bank transfer form for this switch-service.
   */
  readonly attachment?: IAttachment;
}

export interface IAvatarRead {
  /**
   * The UUID of the created avatar.
   */
  readonly uuid?: string;
  /**
   * The content type of the image.
   */
  readonly image?: Array<IImage>;
}

export interface IAvatarCreate {
  /**
   * The UUID of the created avatar.
   */
  readonly uuid?: string;
}

export interface IAvatar {
  /**
   * The public UUID of the avatar.
   */
  uuid?: string;
  /**
   * The public UUID of object this avatar is anchored to.
   */
  readonly anchor_uuid?: string;
  /**
   * The actual image information of this avatar.
   */
  readonly image?: Array<IImage>;
}

export interface IAttachmentUserRead {
  /**
   * The id of the attachment.
   */
  readonly id?: number;
  /**
   * The timestamp of the attachment's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the attachment's last update.
   */
  readonly updated?: string;
  /**
   * The attachment.
   */
  readonly attachment?: IAttachment;
}

export interface IAttachmentUserContentListing {}

export interface IAttachmentTabRead {
  /**
   * The id of the attachment.
   */
  readonly id?: number;
  /**
   * The timestamp of the attachment's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the attachment's last update.
   */
  readonly updated?: string;
  /**
   * The attachment.
   */
  readonly attachment?: IAttachment;
}

export interface IAttachmentTabCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IAttachmentTabContentListing {}

export interface IAttachmentTab {}

export interface IAttachmentPublicRead {
  /**
   * The UUID of the attachment.
   */
  readonly uuid?: string;
  /**
   * The timestamp of the attachment's creation.
   */
  readonly created?: string;
  /**
   * The timestamp of the attachment's last update.
   */
  readonly updated?: string;
  /**
   * The attachment.
   */
  readonly attachment?: IAttachment;
}

export interface IAttachmentPublicCreate {
  /**
   * The id of the created item
   */
  readonly Id?: BunqId;
}

export interface IAttachmentPublicContentListing {}

export interface IAttachmentPublic {}

export interface IAttachmentMonetaryAccountPayment {
  /**
   * The id of the attached Attachment.
   */
  id?: number;
  /**
   * The id of the MonetaryAccount this Attachment is attached from.
   */
  readonly monetary_account_id?: number;
}

export interface IAttachmentMonetaryAccountCreate {
  /**
   * The ID of the attachment created.
   */
  readonly id?: number;
}

export interface IAttachmentMonetaryAccountContentListing {}

export interface IAttachmentMonetaryAccount {}

export interface IAttachmentConversationContentListing {}

export interface IAttachment {
  /**
   * The description of the attachment.
   */
  readonly description?: string;
  /**
   * The content type of the attachment's file.
   */
  readonly content_type?: string;
}

export interface IAmount {
  /**
   * The amount formatted to two decimal places.
   */
  value: string;
  /**
   * The currency of the amount. It is an ISO 4217 formatted currency code.
   */
  currency: string;
}

export interface IAddress {
  /**
   * The street.
   */
  street: string;
  /**
   * The house number.
   */
  house_number: string;
  /**
   * The PO box.
   */
  po_box: string;
  /**
   * The postal code.
   */
  postal_code: string;
  /**
   * The city.
   */
  city: string;
  /**
   * The country as an ISO 3166-1 alpha-2 country code..
   */
  country: string;
  /**
   * The appartment, building or other extra information for addresses.
   */
  extra?: string;
  /**
   * The name on the mailbox (only used for Postal addresses).
   */
  mailbox_name?: string;
  /**
   * The province according to local standard.
   */
  readonly province?: string;
}

export type BunqId = string;
export type AssignmentType = "PRIMARY" | "SECONDARY" | "TERTIARY";
export type CardType = "MAESTRO" | "MASTERCARD" | "MAESTRO_MOBILE_NFC";
export type NoteEventType =
    | "bunqme-fundraiser-result"
    | "draft-payment"
    | "ideal-merchant-transaction"
    | "mastercard-action"
    | "payment-batch"
    | "payment"
    | "request-inquiry-batch"
    | "request-inquiry"
    | "request-response"
    | "schedule"
    | "sofort-merchant-transaction"
    | "switch-service-payment"
    | "whitelist";
export type NotificationCategoryType =
    | "BILLING"
    | "CARD_TRANSACTION_FAILED"
    | "CARD_TRANSACTION_SUCCESSFUL"
    | "CHAT"
    | "DRAFT_PAYMENT"
    | "IDEAL"
    | "SOFORT"
    | "MONETARY_ACCOUNT_PROFILE"
    | "MUTATION"
    | "PAYMENT"
    | "PROMOTION"
    | "REQUEST"
    | "SCHEDULE_RESULT"
    | "SCHEDULE_STATUS"
    | "SHARE"
    | "SUPPORT"
    | "TAB_RESULT"
    | "USER_APPROVAL";
export type NotificationDeliveryMethodType =
    | "URL"
    | "PUSH";
export type RecurrenceUnitType ="ONCE" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
export type ScheduleStatusType ="ACTIVE" | "FINISHED" | "CANCELLED";
export type ShareInviteMonetaryAccountResponseStatus =
    | "REVOKED"
    | "ACCEPTED"
    | "CANCELLED"
    | "CANCELLATION_PENDING"
    | "CANCELLATION_ACCEPTED"
    | "CANCELLATION_REJECTED";
